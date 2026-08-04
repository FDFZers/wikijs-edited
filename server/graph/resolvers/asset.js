const _ = require('lodash')
const sanitize = require('sanitize-filename')
const graphHelper = require('../../helpers/graph')
const assetHelper = require('../../helpers/asset')
const path = require('path')

/* global WIKI */

module.exports = {
  Query: {
    async assets() { return {} }
  },
  Mutation: {
    async assets() { return {} }
  },
  AssetQuery: {
    async list(obj, args, context) {
      let cond = {
        dir: args.dir
      }
      if (args.kind !== 'ALL') {
        cond.kind = args.kind.toLowerCase()
      }
      const results = await WIKI.models.assets.query().where(cond)
      return _.filter(results, r => {
        const filePath = path.join(args.dir, r.filename)
        return WIKI.auth.checkAccess(context.req.user, ['read:assets'], { path: filePath })
      }).map(a => ({
        ...a,
        kind: a.kind.toUpperCase()
      }))
    },
    async folders(obj, args, context) {
      const results = await WIKI.models.assets.getAllPaths()
      return _.filter(results, path =>
        WIKI.auth.checkAccess(context.req.user, ['read:assets'], { path }))
    }
  },
  AssetMutation: {
    /**
     * Rename an Asset
     */
    async renameAsset(obj, args, context) {
      try {
        const filename = sanitize(args.filename).toLowerCase()

        const asset = await WIKI.models.assets.query().findById(args.id)
        if (asset) {
          // Check for extension mismatch
          if (!_.endsWith(filename, asset.ext)) {
            throw new WIKI.Error.AssetRenameInvalidExt()
          }

          // Check for non-dot files changing to dotfile
          if (asset.ext.length > 0 && filename.length - asset.ext.length < 1) {
            throw new WIKI.Error.AssetRenameInvalid()
          }

          // Check for collision
          const assetCollision = await WIKI.models.assets.query().where({
            filename,
            dir: asset.dir
          }).first()
          if (assetCollision) {
            throw new WIKI.Error.AssetRenameCollision()
          }

          // Check source asset permissions
          const assetSourcePath = path.join(asset.dir, asset.filename)
          if (!WIKI.auth.checkAccess(context.req.user, ['manage:assets'], { path: assetSourcePath })) {
            throw new WIKI.Error.AssetRenameForbidden()
          }

          // Check target asset permissions
          const assetTargetPath = path.join(asset.dir, filename)
          if (!WIKI.auth.checkAccess(context.req.user, ['write:assets'], { path: assetTargetPath })) {
            throw new WIKI.Error.AssetRenameTargetForbidden()
          }

          // Update filename + hash
          const fileHash = assetHelper.generateHash(WIKI.models.assets.correctDir(assetTargetPath))
          await WIKI.models.assets.query().patch({
            filename: filename,
            hash: fileHash
          }).findById(args.id)

          // Delete old asset cache
          await asset.deleteAssetCache()

          // Rename in Storage
          await WIKI.models.storage.assetEvent({
            event: 'renamed',
            asset: {
              ...asset,
              path: assetSourcePath,
              destinationPath: assetTargetPath,
              moveAuthorId: context.req.user.id,
              moveAuthorName: context.req.user.name,
              moveAuthorEmail: context.req.user.email
            }
          })

          return {
            responseResult: graphHelper.generateSuccess('Asset has been renamed successfully.')
          }
        } else {
          throw new WIKI.Error.AssetInvalid()
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    },
    /**
     * Move an Asset
     */
    async moveAsset(obj, args, context) {
      try {
        const dir = WIKI.models.assets.correctDir(args.dir)

        const asset = await WIKI.models.assets.query().findById(args.id)
        if (asset) {
          // Check for collision
          const assetCollision = await WIKI.models.assets.query().where({
            filename: asset.filename,
            dir
          }).first()
          if (assetCollision) {
            throw new WIKI.Error.AssetRenameCollision()
          }

          // Check source asset permissions
          const assetSourcePath = path.join(asset.dir, asset.filename)
          if (!WIKI.auth.checkAccess(context.req.user, ['manage:assets'], { path: assetSourcePath })) {
            throw new WIKI.Error.AssetRenameForbidden()
          }

          // Check target asset permissions
          const assetTargetPath = path.join(dir, asset.filename)
          if (!WIKI.auth.checkAccess(context.req.user, ['write:assets'], { path: assetTargetPath })) {
            throw new WIKI.Error.AssetRenameTargetForbidden()
          }

          // Update dir + hash
          const fileHash = assetHelper.generateHash(WIKI.models.assets.correctDir(assetTargetPath))
          await WIKI.models.assets.query().patch({
            dir,
            hash: fileHash
          }).findById(args.id)

          // Delete old asset cache
          await asset.deleteAssetCache()

          // Rename in Storage
          await WIKI.models.storage.assetEvent({
            event: 'renamed',
            asset: {
              ...asset,
              path: assetSourcePath,
              destinationPath: assetTargetPath,
              moveAuthorId: context.req.user.id,
              moveAuthorName: context.req.user.name,
              moveAuthorEmail: context.req.user.email
            }
          })

          return {
            responseResult: graphHelper.generateSuccess('Asset has been moved successfully.')
          }
        } else {
          throw new WIKI.Error.AssetInvalid()
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    },
    /**
     * Delete an Asset
     */
    async deleteAsset(obj, args, context) {
      try {
        const asset = await WIKI.models.assets.query().findById(args.id)
        if (asset) {
          // Check permissions
          const assetPath = path.join(asset.dir, asset.filename)
          if (!WIKI.auth.checkAccess(context.req.user, ['manage:assets'], { path: assetPath })) {
            throw new WIKI.Error.AssetDeleteForbidden()
          }

          await WIKI.models.knex('assetData').where('id', args.id).del()
          await WIKI.models.assets.query().deleteById(args.id)
          await asset.deleteAssetCache()

          // Delete from Storage
          await WIKI.models.storage.assetEvent({
            event: 'deleted',
            asset: {
              ...asset,
              path: assetPath,
              authorId: context.req.user.id,
              authorName: context.req.user.name,
              authorEmail: context.req.user.email
            }
          })

          return {
            responseResult: graphHelper.generateSuccess('Asset has been deleted successfully.')
          }
        } else {
          throw new WIKI.Error.AssetInvalid()
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    },
    /**
     * Flush Temporary Uploads
     */
    async flushTempUploads(obj, args, context) {
      try {
        await WIKI.models.assets.flushTempUploads()
        return {
          responseResult: graphHelper.generateSuccess('Temporary Uploads have been flushed successfully.')
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    }
  }
}
