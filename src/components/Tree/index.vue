<!--
 * @Author: KokoTa
 * @Date: 2020-12-28 09:18:24
 * @LastEditTime: 2021-01-26 17:26:09
 * @LastEditors: KokoTa
 * @Description: 树形组件
 * @FilePath: /future-bms/src/components/Tree/index.vue
-->
<template>
  <div>
    <el-input class="filter" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="treeProp"
      :node-key="nodeKey"
      :filter-node-method="filterNode"
      :show-checkbox="showCheckbox"
      @node-click="nodeClick"
      @check-change="checkChange"
      highlight-current
      default-expand-all
      :expand-on-click-node="false"
    >
      <div class="custom-tree-node" slot-scope="scope">
        <span>{{scope.node.label}}</span>
        <span v-if="showOperation && scope.node.label">
          <!-- 这里阻止冒泡防止出发 nodeClick -->
          <i class="el-icon-circle-plus-outline" @click.stop="append(scope.node, scope.data)"></i>
          <i
            class="el-icon-remove-outline"
            v-if="scope.node.level !== 1"
            @click.stop="remove(scope.node, scope.data)"
          ></i>
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
/**
 * 树形操作逻辑备注：
 * 情况一：用户点击 + 并保存副本(appendNode变量)后，可能点击 其他node/+/-
 * 此时需要一个弹出框来判断副本和选择的节点数据是否一致，这里通过 id 判断
 * 当用户选择取消时，直接刷新树数据，appendNode 需要清除
 * 当用户选择新增时，需要传出 treeAdd 事件，appendNode 需要清除
 * 情况二：用户点击上层组件的新增按钮
 * 此时新增后需要手动清除 appendNode
 */
export default {
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    treeProp: {
      type: Object,
      default: () => ({
        label: 'label',
        children: 'children'
      })
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    showOperation: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterText: '',
      appendNode: null
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 新增节点
    async append (node, data) {
      // this.$prompt('请输入节点名', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
      //   inputErrorMessage: '节点格式只能为中文、字母、数字、下划线组合'
      // }).then(({ value }) => {
      // }).catch(() => {})
      await this.saveOrNot(data)
      const treePropLabel = this.treeProp.label
      const treePropChildren = this.treeProp.children
      const newChild = {
        [treePropLabel]: '',
        pprojectId: node.key,
        pprojectName: node.label
      }
      if (!data[treePropChildren]) {
        this.$set(data, treePropChildren, [])
      }
      data[treePropChildren].push(newChild)
      this.appendNode = newChild
      this.$emit('treeAppend', newChild)
    },
    // 删除节点
    async remove (node, data) {
      await this.saveOrNot(data)
      this.$confirm('是否删除该节点？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const treePropChildren = this.treeProp.children
        const parent = node.parent
        const children = parent.data[treePropChildren] || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.$emit('treeRemove', data)
      }).catch(() => {})
    },
    // 节点点击
    async nodeClick (data) {
      await this.saveOrNot(data)
      // 获取节点路径
      const node = this.$refs.tree.getNode(data)
      const path = this._getPath(node).join('-')
      data.path = path
      this.$emit('nodeClick', data)
    },
    // 未保存的节点需要弹窗确认是否保存
    saveOrNot (data) {
      return new Promise((resolve, reject) => {
        if (this.appendNode &&
          this.appendNode.id !== data.id) {
          this.$confirm('是否保存未保存节点？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('treeAdd', { ...this.appendNode })
            this.appendNode = null
            resolve()
          }).catch(() => {
            this.$emit('treeReload')
            this.appendNode = null
            resolve()
          })
        } else {
          resolve()
        }
      })
    },
    // 节点复选监听
    checkChange (data, checked, indeterminate) {
      const { children: treePropChildren } = this.treeProp
      // 获取最底层的节点
      if (!data[treePropChildren] || data[treePropChildren].length === 0) {
        const node = this.$refs.tree.getNode(data)
        const path = this._getPath(node).join('-')
        data.path = path
        data.checked = checked
        this.$emit('checkChange', data)
      }
    },
    // 节点过滤
    filterNode (value, data) {
      const treePropLabel = this.treeProp.label
      if (!value) return true
      return data[treePropLabel].indexOf(value) !== -1
    },
    // 获取当前选择的节点数据
    getCheckedNodes () {
      return this.$refs.tree.getCheckedNodes()
    },

    // 路径获取函数
    _getPath (node, strArr = []) {
      const { label: treePropLabel } = this.treeProp
      if (node.parent) {
        strArr.unshift(node[treePropLabel])
        this._getPath(node.parent, strArr)
      }
      return strArr
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 5px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  i {
    padding: 5px;
    font-size: 16px;
    &:hover {
      background-color: $lightGray;
    }
  }
}
</style>
