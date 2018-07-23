<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>Case Details / Process Version:  <el-button  @click="handleDiagram" >[{{taskInfo.processDefinitionKey}}]</el-button> </span>
      </div>
      <div>
        <el-collapse v-model="activeNames" v-loading="loading">
          <el-collapse-item title="Client Info" name="1">
            <el-form :rules="rules" :model="client" label-position="left"  label-width="100px" style=' margin-left:30px;margin-right: 30px;'>
              <el-row type="flex" class="row-bg">
                <el-col :span="12" class="form-item">
                  <el-form-item :label="$t('case.clientName')">
                    <el-input class="filter-item" :readonly="true" v-model="client.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form-item">
                  <el-form-item :label="$t('case.entityType')">
                    <el-select  class="filter-item" :readonly="true" v-model="client.entityType" placeholder="Please select">
                      <el-option v-for="item in  entityType" :key="item.key" :label="item.display_name" :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg">
                <el-col :span="12" class="form-item">
                  <el-form-item :label="$t('case.phone')">
                    <el-input class="filter-item" :readonly="true" v-model="client.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form-item">
                  <el-form-item :label="$t('case.email')">
                    <el-input class="filter-item" :readonly="true" v-model="client.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg">
                <el-col :span="12" class="form-item">
                  <el-form-item :label="$t('case.country')">
                    <el-input class="filter-item" :readonly="true" v-model="client.country"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form-item">
                  <el-form-item :label="$t('case.province')">
                    <el-input class="filter-item" :readonly="true" v-model="client.province"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg">
                <el-col :span="12" class="form-item">
                  <el-form-item :label="$t('case.address')">
                    <el-input class="filter-item" :readonly="true" v-model="client.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form-item" v-if="client.resultState">
                  <el-form-item :label="$t('case.resultState')">
                    <el-input class="filter-item" :readonly="true" v-model="client.resultState"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg">
                <el-col :span="24" class="form-item">
                  <el-form-item :label="$t('case.industry')">
                    <el-input type="textarea" :readonly="true" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="client.industry">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </el-collapse-item>
          <el-collapse-item title="History" name="2">
            <el-table
              :data="caseHistories"
              style="width: 100%">
              <el-table-column
                prop="taskName"
                label="State">
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="Start Time">
                <template slot-scope="scope">
                  <span>{{scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="Complete Time">
                <template slot-scope="scope">
                  <span>{{scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="assignee"
                label="Operator">
              </el-table-column>
              <el-table-column
                prop="operation"
                label="Result">
              </el-table-column>
              <el-table-column
                prop="comments"
                label="Comments">
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="External System Results" name="3">
            <el-table
              :data="externalSysResults"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="System Name">
              </el-table-column>
              <el-table-column
                prop="commitTime"
                label="Return Time">
                <template slot-scope="scope">
                  <span>{{scope.row.commitTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="Result">
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="Required Documents" name="4">
            <el-table
              :data="documents"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="File Name">
              </el-table-column>
              <el-table-column
                prop="status"
                label="Operation">
                <template slot-scope="scope">
                  <el-upload v-if="scope.row.status=='need'"
                    action="http://localhost:8081/v1/files"
                    :headers="{token:getThatToken()}"
                             :on-success="handleUploadSuccess"
                    :limit="1"
                    :data="{id:scope.row.id,caseId:scope.row.caseId}">
                    <el-button  size="small" type="primary">Click to Upload</el-button>
                  </el-upload>
                  <el-tag v-else closable @close="handleRemoveFile(scope.row)" ><a v-bind:href='getDownloadUrl(scope.row.id)'>{{scope.row.name}}</a> </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="Actions" name="5">
            <el-form :rules="rules" :model="caseInfo" label-position="left"  label-width="100px" style=' margin-left:30px;margin-right: 30px;'>
              <el-row type="flex" class="row-bg">
                <el-col :span="12" class="form-item">
                  <el-form-item label="Result">
                    <el-select  class="filter-item" v-model="caseInfo.processResult" placeholder="Please select">
                      <el-option v-for="item in  resultOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="form-item" v-if="caseInfo.processResult=='rollback'">
                  <el-form-item label="Back To">
                    <el-select  class="filter-item" v-model="caseInfo.backTo" placeholder="Please select">
                      <el-option v-for="item in  caseHistories" :key="item.taskName" :label="item.taskName" :value="item.taskId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg">
                <el-col :span="24" class="form-item">
                  <el-form-item label="Comments">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="caseInfo.comments">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>


        <el-button type="primary" @click="handleConfirm"  style="float: right;margin: 5px;">{{$t('case.confirm')}}</el-button>
    <el-button  @click="handleCancel"  style="float: right;margin: 5px;">{{$t('case.cancel')}}</el-button>

    <el-dialog title="Process Status" :visible.sync="dialogDiagramVisible" width="80%" >
        <iframe :src="dialogDiagramUrl" id="dialogDiagramIframe" frameborder="no" border="0" marginwidth="0" marginheight="0"/>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchCase, updateCase } from '@/api/case'
  import waves from '@/directive/waves' // 水波纹指令
  import { getToken } from '@/utils/auth' // getToken from cookie
  import { removeFile, fetchFiles } from '@/api/file' // getToken from cookie
  import { fetchFormInfo } from '@/api/model' // getToken from cookie

  const entityType = [
    { key: 'individual', display_name: 'Individual' },
    { key: 'corporate', display_name: 'Corporate' },
    { key: 'npo', display_name: 'NPO' },
    { key: 'ngo', display_name: 'NGO' },
    { key: 'government', display_name: 'Government' }
  ]

  export default {
    name: 'taskingTable',
    directives: {
      waves
    },
    data() {
      return {
        activeNames: ['1', '5'],
        entityType,
        caseInfo: {},
        client: {},
        documents: [],
        externalSysResults: [],
        taskInfo: {},
        caseHistories: [],
        dialogDiagramVisible: false,
        dialogDiagramUrl: '',
        loading: true,
        rules: {
          name: [{ required: true, message: 'name is required', trigger: 'change' }],
          industry: [{ required: true, message: 'industry is required', trigger: 'change' }],
          phone: [{ required: true, message: 'phone is required', trigger: 'change' }],
          email: [{ required: true, message: 'email is required', trigger: 'change' }],
          faxNo: [{ required: true, message: 'faxNo is required', trigger: 'change' }],
          country: [{ required: true, message: 'country is required', trigger: 'change' }],
          province: [{ required: true, message: 'province is required', trigger: 'change' }],
          address: [{ required: true, message: 'address is required', trigger: 'change' }],
          entityType: [{ required: true, message: 'entityType is required', trigger: 'change' }]
        },
        resultOptions: [{
          value: 'pass',
          label: 'Pass'
        }, {
          value: 'rollback',
          label: 'RollBack'
        }],
        downloadLoading: false
      }
    },
    created() {
      this.getCaseInfo(this.$route.query.caseId)
    },
    methods: {
      getCaseInfo(caseId) {
        fetchCase(caseId).then(response => {
          this.caseInfo = response.data.caseInfo
          this.client = response.data.client
          this.documents = response.data.documents
          this.externalSysResults = response.data.externalSysResults
          this.taskInfo = response.data.taskInfo
          this.caseHistories = response.data.caseHistories
          this.loading = false
        })
      },
      handleCancel(val) {
        this.$store.dispatch('delVisitedViews', this.$route)
        this.$router.push('tasking')
      },
      handleConfirm(val) {
        this.loading = true
        updateCase({ caseInfo: this.caseInfo, client: this.client }).then(response => {
          this.$notify({
            title: 'Success',
            message: 'submit success',
            type: 'success',
            duration: 2000
          })
          fetchFormInfo(response.data.taskId).then(response => {
            var formInfo = response.data
            if (formInfo.content) {
              this.$notify({
                title: 'Attention',
                message: formInfo.content,
                type: 'warning',
                duration: 5000
              })
            }
            this.loading = false
            this.$store.dispatch('delVisitedViews', this.$route)
            this.$router.push('tasking')
          })
        })
      },
      handleDiagram() {
        this.dialogDiagramVisible = true
        this.dialogDiagramUrl = '/static/flow/modeler/display/displaymodel-embed.html?modelId=' + this.taskInfo.processInstanceId + '&modelType=runtime&token=' + getToken()
      },
      getThatToken() {
        return getToken()
      },
      getDownloadUrl(id) {
        return 'http://localhost:8081/v1/file/' + id
      },
      handleRemoveFile(row) {
        removeFile(row.id).then(response => {
          fetchFiles(row.caseId).then(response => {
            this.documents = response.data
          })
        })
      },
      handleUploadSuccess() {
        fetchFiles(this.$route.query.caseId).then(response => {
          this.documents = response.data
        })
      }
    }
  }
</script>

<style scoped>
  .form-item{
    padding-left: 10px;
    padding-right: 10px;
  }
</style>

