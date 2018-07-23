<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  style="width: 200px;" class="filter-item" :placeholder="$t('case.clientName')" v-model="listQuery.clientName">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.entityType" :placeholder="$t('case.entityType')">
        <el-option v-for="item in  entityType" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('case.search')}}</el-button>
<!--
      <el-button class="filter-item" v-permission="['admin']" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('case.add')}}</el-button>
-->
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column  align="center" :label="$t('case.clientName')">
        <template slot-scope="scope">
          <span>{{scope.row.clientName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" :label="$t('case.taskName')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('case.country')">
        <template slot-scope="scope">
          <span>{{scope.row.country}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('case.entityType')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.entityType | typeFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Version">
        <template slot-scope="scope">
          <span>{{scope.row.processDefinitionId | getVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('case.createTime')">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('case.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.assignee" type="primary" size="mini" @click="handleClaim(scope.row)">{{$t('case.claim')}}</el-button>
          <el-button v-if="scope.row.assignee" type="primary" size="mini" @click="handleUnclaim(scope.row)">{{$t('case.unclaim')}}</el-button>
          <router-link :to="{ path: 'handle-case',query: {caseId: scope.row.caseId,formKey:scope.row.formKey}}">
            <el-button v-if="scope.row.assignee" size="mini" type="success" >{{$t('case.handler')}}</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left"  label-width="100px" style=' margin-left:30px;margin-right: 30px;'>
        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.clientName')">
              <el-input class="filter-item" v-model="temp.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.entityType')">
              <el-select  class="filter-item" v-model="temp.entityType" placeholder="Please select">
                <el-option v-for="item in  entityType" :key="item.key" :label="item.display_name" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.phone')">
              <el-input class="filter-item" v-model="temp.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.email')">
              <el-input class="filter-item" v-model="temp.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.country')">
              <el-input class="filter-item" v-model="temp.country"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.province')">
              <el-input class="filter-item" v-model="temp.province"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.address')">
              <el-input class="filter-item" v-model="temp.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('case.processDefinition')">
              <el-select  class="filter-item" v-model="temp.processDefinitionId" placeholder="Please select">
                <el-option v-for="item in  processDefiitons" :key="item.id" :label="item.key" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="24" class="form-item">
          <el-form-item :label="$t('case.industry')">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.industry">
            </el-input>
          </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('case.cancel')}}</el-button>
        <el-button  type="primary" @click="createData">{{$t('case.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createCase } from '@/api/case'
import { fetchProcessDefinitionList } from '@/api/model'
import { claimTask, unclaimTask, completeTask } from '@/api/task'
import waves from '@/directive/waves' // 水波纹指令
import permission from '@/directive/permission/index.js' // 权限判断指令

const entityType = [
  { key: 'individual', display_name: 'Individual' },
  { key: 'corporate', display_name: 'Corporate' },
  { key: 'npo', display_name: 'NPO' },
  { key: 'ngo', display_name: 'NGO' },
  { key: 'government', display_name: 'Government' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const entityTypeKeyValue = entityType.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'taskingTable',
  directives: {
    waves,
    permission
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      entityType,
      processDefiitons: null,
      temp: {
        id: undefined,
        caseId: '',
        name: '',
        industry: '',
        phone: '',
        email: '',
        faxNo: '',
        country: '',
        province: '',
        address: '',
        entityType: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
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
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return entityTypeKeyValue[type]
    },
    getVersion(processDefinitionId) {
      return processDefinitionId.split('\:')[0]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleRefresh() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },

    resetTemp() {
      this.temp = {
        id: undefined,
        caseId: '',
        name: '',
        industry: '',
        phone: '',
        email: '',
        faxNo: '',
        country: '',
        province: '',
        address: '',
        entityType: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      fetchProcessDefinitionList(0, 10, 'cdd').then(response => {
        this.processDefiitons = response.data
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createCase(this.temp, this.temp.processDefinitionId).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'create case success',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleClaim(row) {
      claimTask(row.taskId).then(() => {
        this.getList()
        this.$notify({
          title: 'Success',
          message: 'claim task success',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleUnclaim(row) {
      unclaimTask(row.taskId).then(() => {
        this.getList()
        this.$notify({
          title: 'Success',
          message: 'unclaim task success',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleComplete(row) {
      completeTask(row.taskId).then(() => {
        this.getList()
        this.$notify({
          title: 'Success',
          message: 'complete task',
          type: 'success',
          duration: 2000
        })
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
