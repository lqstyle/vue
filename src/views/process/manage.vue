<template>
  <div class="app-container" style="width:100%;height:100%;margin: 0px;padding: 0px;">
        <iframe :src="src" id="dialogDiagramIframe" frameborder="no" border="0" marginwidth="0" marginheight="0"  style="width:100%;height:100%;"/>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth' // getToken from cookie

  export default {
    name: 'modeler',
    data() {
      return {
        src: '/static/flow/admin/index.html?token=' + getToken()
      }
    }
  }
</script>

