<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" :placeholder="$t('user.loginName')"
                v-model="listQuery.userName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('user.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">{{$t('user.add')}}
      </el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:1000px;">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column align="center" :label="$t('user.loginName')">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.role')">
        <template slot-scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.email')">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.createDate')">
        <template slot-scope="scope">
          <span>{{scope.row.createDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.action')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="handleUpdate(scope.row)">
            {{$t('user.modify')}}
          </el-button>
          <el-button type="primary" size="mini" @click="handleDelete(scope.row)">
            {{$t('user.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px"
               style=' margin-left:30px;margin-right: 30px;'>
        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('user.loginName')">
              <el-input class="filter-item" v-model="temp.username"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('user.password')">
              <el-input class="filter-item" v-model="temp.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('user.phone')">
              <el-input class="filter-item" v-model="temp.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('user.mobile')">
              <el-input class="filter-item" v-model="temp.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('user.email')">
              <el-input class="filter-item" v-model="temp.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item :label="$t('user.roleId')">
              <el-select class="filter-item" v-model="temp.roleId" placeholder="Please select">
                <el-option v-for="item  in  roles" :key="item.id" :label="'['+item.name+']'"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('user.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('user.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('user.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { fetchList, createUser, updateUser } from '@/api/user'
  import { fetchRoleList } from '@/api/role'
  import { deleteUser } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'taskingTable',
    directives: {
      waves
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
        roles: null,
        temp: {
          id: undefined,
          userId: '',
          loginName: '',
          password: '',
          phone: '',
          mobile: '',
          roleId: '',
          email: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        rules: {
          loginName: [{ required: true, message: 'username is required', trigger: 'change' }],
          password: [{ required: true, message: 'password is required', trigger: 'change' }],
          phone: [{ required: true, message: 'phone is required', trigger: 'change' }],
          mobile: [{ required: true, message: 'mobile is required', trigger: 'change' }],
          roleId: [{ required: true, message: 'roleId is required', trigger: 'change' }],
          email: [{ required: true, message: 'email is required', trigger: 'change' }]
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
      handleModifyStatus(row, status) {
        this.$message({
          message: 'Success',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          userId: '',
          loginName: '',
          password: '',
          phone: '',
          mobile: '',
          roleId: '',
          email: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        fetchRoleList().then(response => {
          this.roles = response.data
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createUser(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'create user success',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        deleteUser(row.id).then(() => {
          this.getList()
          this.$notify({
            title: 'Success',
            message: 'delete user success',
            type: 'success',
            duration: 2000
          })
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'Update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        fetchRoleList().then(response => {
          this.roles = response.data
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateUser(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Modify user success',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .form-item {
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
