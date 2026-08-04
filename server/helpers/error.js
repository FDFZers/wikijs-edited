const CustomError = require('custom-error-instance')

module.exports = {
  AssetDeleteForbidden: CustomError('AssetDeleteForbidden', {
    message: '您没有权限删除此资源。',
    code: 2003
  }),
  AssetFolderExists: CustomError('AssetFolderExists', {
    message: '同名资源文件夹已存在。',
    code: 2002
  }),
  AssetGenericError: CustomError('AssetGenericError', {
    message: '资源操作过程中发生意外错误。',
    code: 2001
  }),
  AssetInvalid: CustomError('AssetInvalid', {
    message: '该资源不存在或无效。',
    code: 2004
  }),
  AssetRenameCollision: CustomError('AssetRenameCollision', {
    message: '同一文件夹下已存在同名文件。',
    code: 2005
  }),
  AssetRenameForbidden: CustomError('AssetRenameForbidden', {
    message: '您没有权限重命名此资源。',
    code: 2006
  }),
  AssetRenameInvalid: CustomError('AssetRenameInvalid', {
    message: '新的资源文件名无效。',
    code: 2007
  }),
  AssetRenameInvalidExt: CustomError('AssetRenameInvalidExt', {
    message: '无法更改现有资源的文件扩展名。',
    code: 2008
  }),
  AssetRenameTargetForbidden: CustomError('AssetRenameTargetForbidden', {
    message: '您没有权限将此资源重命名为指定名称。',
    code: 2009
  }),
  AuthAccountBanned: CustomError('AuthAccountBanned', {
    message: '您的账户已被禁用。',
    code: 1013
  }),
  AuthAccountAlreadyExists: CustomError('AuthAccountAlreadyExists', {
    message: '使用该邮箱地址的账户已存在。',
    code: 1004
  }),
  AuthAccountNotVerified: CustomError('AuthAccountNotVerified', {
    message: '您必须先验证账户才能登录。',
    code: 1014
  }),
  AuthGenericError: CustomError('AuthGenericError', {
    message: '登录过程中发生意外错误。',
    code: 1001
  }),
  AuthLoginFailed: CustomError('AuthLoginFailed', {
    message: '邮箱/用户名或密码无效。',
    code: 1002
  }),
  AuthPasswordInvalid: CustomError('AuthPasswordInvalid', {
    message: '密码不正确。',
    code: 1020
  }),
  AuthProviderInvalid: CustomError('AuthProviderInvalid', {
    message: '无效的认证提供商。',
    code: 1003
  }),
  AuthRegistrationDisabled: CustomError('AuthRegistrationDisabled', {
    message: '注册功能已关闭，请联系系统管理员。',
    code: 1010
  }),
  AuthRegistrationDomainUnauthorized: CustomError('AuthRegistrationDomainUnauthorized', {
    message: '您无权注册，您的邮箱域名不在白名单内。',
    code: 1011
  }),
  AuthRequired: CustomError('AuthRequired', {
    message: '访问此资源需要先进行身份验证。',
    code: 1019
  }),
  AuthTFAFailed: CustomError('AuthTFAFailed', {
    message: '双重认证 (2FA) 安全码不正确。',
    code: 1005
  }),
  AuthTFAInvalid: CustomError('AuthTFAInvalid', {
    message: '双重认证 (2FA) 安全码或登录令牌无效。',
    code: 1006
  }),
  AuthValidationTokenInvalid: CustomError('AuthValidationTokenInvalid', {
    message: '验证令牌无效。',
    code: 1015
  }),
  BruteInstanceIsInvalid: CustomError('BruteInstanceIsInvalid', {
    message: '无效的暴力破解防护实例。',
    code: 1007
  }),
  BruteTooManyAttempts: CustomError('BruteTooManyAttempts', {
    message: '尝试次数过多！请稍后再试。',
    code: 1008
  }),
  CommentContentMissing: CustomError('CommentContentMissing', {
    message: '评论内容缺失或过短。',
    code: 8003
  }),
  CommentGenericError: CustomError('CommentGenericError', {
    message: '发生意外错误。',
    code: 8001
  }),
  CommentManageForbidden: CustomError('CommentManageForbidden', {
    message: '您没有权限管理此页面的评论。',
    code: 8004
  }),
  CommentNotFound: CustomError('CommentNotFound', {
    message: '该评论不存在。',
    code: 8005
  }),
  CommentPostForbidden: CustomError('CommentPostForbidden', {
    message: '您没有权限在此页面发表评论。',
    code: 8002
  }),
  CommentViewForbidden: CustomError('CommentViewForbidden', {
    message: '您没有权限查看此页面的评论。',
    code: 8006
  }),
  InputInvalid: CustomError('InputInvalid', {
    message: '输入数据无效。',
    code: 1012
  }),
  LocaleGenericError: CustomError('LocaleGenericError', {
    message: '语言环境操作过程中发生意外错误。',
    code: 5001
  }),
  LocaleInvalidNamespace: CustomError('LocaleInvalidNamespace', {
    message: '无效的语言环境或命名空间。',
    code: 5002
  }),
  MailGenericError: CustomError('MailGenericError', {
    message: '邮件操作过程中发生意外错误。',
    code: 3001
  }),
  MailInvalidRecipient: CustomError('MailInvalidRecipient', {
    message: '收件人邮箱地址无效。',
    code: 3004
  }),
  MailNotConfigured: CustomError('MailNotConfigured', {
    message: '邮件配置不完整或无效。',
    code: 3002
  }),
  MailTemplateFailed: CustomError('MailTemplateFailed', {
    message: '邮件模板加载失败。',
    code: 3003
  }),
  PageCreateForbidden: CustomError('PageCreateForbidden', {
    message: '您没有权限创建此页面。',
    code: 6008
  }),
  PageDeleteForbidden: CustomError('PageDeleteForbidden', {
    message: '您没有权限删除此页面。',
    code: 6010
  }),
  PageGenericError: CustomError('PageGenericError', {
    message: '页面操作过程中发生意外错误。',
    code: 6001
  }),
  PageDuplicateCreate: CustomError('PageDuplicateCreate', {
    message: '无法创建此页面，因为相同路径下已存在条目。',
    code: 6002
  }),
  PageEmptyContent: CustomError('PageEmptyContent', {
    message: '页面内容不能为空。',
    code: 6004
  }),
  PageHistoryForbidden: CustomError('PageHistoryForbidden', {
    message: '您没有权限查看此页面的历史记录。',
    code: 6012
  }),
  PageIllegalPath: CustomError('PageIllegalPath', {
    message: '页面路径不能包含非法字符。',
    code: 6005
  }),
  PageMoveForbidden: CustomError('PageMoveForbidden', {
    message: '您没有权限移动此页面。',
    code: 6007
  }),
  PageNotFound: CustomError('PageNotFound', {
    message: '该页面不存在。',
    code: 6003
  }),
  PagePathCollision: CustomError('PagePathCollision', {
    message: '目标页面路径已存在。',
    code: 6006
  }),
  PageRestoreForbidden: CustomError('PageRestoreForbidden', {
    message: '您没有权限恢复此页面版本。',
    code: 6011
  }),
  PageUpdateForbidden: CustomError('PageUpdateForbidden', {
    message: '您没有权限更新此页面。',
    code: 6009
  }),
  PageViewForbidden: CustomError('PageViewForbidden', {
    message: '您没有权限查看此页面。',
    code: 6013
  }),
  SearchActivationFailed: CustomError('SearchActivationFailed', {
    message: '搜索引擎激活失败。',
    code: 4002
  }),
  SearchGenericError: CustomError('SearchGenericError', {
    message: '搜索操作过程中发生意外错误。',
    code: 4001
  }),
  SystemGenericError: CustomError('SystemGenericError', {
    message: '发生意外错误。',
    code: 7001
  }),
  SystemSSLDisabled: CustomError('SystemSSLDisabled', {
    message: 'SSL 未启用。',
    code: 7002
  }),
  SystemSSLLEUnavailable: CustomError('SystemSSLLEUnavailable', {
    message: "Let's Encrypt 尚未初始化。",
    code: 7004
  }),
  SystemSSLRenewInvalidProvider: CustomError('SystemSSLRenewInvalidProvider', {
    message: '当前提供商不支持 SSL 证书续期。',
    code: 7003
  }),
  UserCreationFailed: CustomError('UserCreationFailed', {
    message: '创建用户时发生意外错误。',
    code: 1009
  }),
  UserDeleteForeignConstraint: CustomError('UserDeleteForeignConstraint', {
    message: '由于内容关联约束，无法删除该用户。',
    code: 1017
  }),
  UserDeleteProtected: CustomError('UserDeleteProtected', {
    message: '无法删除受保护的系统账户。',
    code: 1018
  }),
  UserNotFound: CustomError('UserNotFound', {
    message: '该用户不存在。',
    code: 1016
  })
}
