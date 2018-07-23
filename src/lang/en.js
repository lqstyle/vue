export default {
  route: {
    dashboard: 'Dashboard',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    case: 'Case',
    caseWorking: 'Ongoing Cases',
    caseHistory: 'All Cases',
    handlecase: 'Handle Case',
    user: 'User',
    manage: 'Manage',
    process: 'Process',
    design: 'Process'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    theme: 'theme'
  },
  login: {
    title: 'XXX System',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  case: {
    search: 'Search',
    refresh: 'Refresh',
    add: 'New Case',
    id: 'ID',
    address: 'Address',
    country: 'Country',
    province: 'Province',
    phone: 'Phone',
    industry: 'Remark',
    clientName: 'Client Name',
    clientEmail: 'Email',
    clientLocation: 'Location',
    createTime: 'Start Time',
    claimTime: 'Start Time',
    startTime: 'Create Time',
    endTime: 'Complete Time',
    taskName: 'Current State',
    requiredDocuments: 'Documents',
    entityType: 'Entity Type',
    email: 'Email',
    resultState: 'Result',
    processDefinition: 'Process',
    actions: 'Actions',
    claim: 'Claim',
    unclaim: 'Release',
    handler: 'Detail',
    submit: 'Submit',
    details: 'Details',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  user: {
    search: 'Search',
    refresh: 'Refresh',
    add: 'New User',
    id: 'ID',
    loginName: 'User Name',
    email: 'Email',
    mobile: 'Mobile',
    phone: 'Phone',
    password: 'Password',
    role: 'Role',
    action: 'Action',
    createBy: 'Creator',
    createDate: 'Create Time',
    roleId: 'Role',
    actions: 'Actions',
    delete: 'Delete',
    submit: 'Submit',
    details: 'Details',
    confirm: 'Confirm',
    cancel: 'Cancel',
    modify: 'Modify'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export selected items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Theme change',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  }
}
