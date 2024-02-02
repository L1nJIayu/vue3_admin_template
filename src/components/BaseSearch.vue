<template>
  <div class="base_search">
    <el-row :gutter="10">
      <template v-for="(item, index) in formList" :key="index">
        <el-col
          :xs="getColSpan('xs', item)"
          :sm="getColSpan('sm', item)"
          :md="getColSpan('md', item)"
          :lg="getColSpan('lg', item)"
          :xl="getColSpan('xl', item)">

          <!-- text -->
          <el-input
            v-if="item.type === 'text'"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            clearable />

          <!-- select -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            clearable
            filterable>
            <el-option
              v-for="(o, i) in item.options"
              :label="o.label"
              :value="o.value"></el-option>
          </el-select>

          <!-- date -->
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            clearable/>
          
          <!-- time -->
          <el-time-picker
            v-else-if="item.type === 'time'"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            clearable/>

          <!-- dateTime -->
          <el-date-picker
            v-else-if="item.type === 'dateTime'"
            type="datetime"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            clearable/>

          <!-- dateRange -->
          <el-date-picker
            v-else-if="item.type === 'dateRange'"
            type="daterange"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            clearable/>

          <!-- dateTimeRange -->
          <el-date-picker
            v-else-if="item.type === 'dateTimeRange'"
            type="datetimerange"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            clearable/>
          
        </el-col>
      </template>
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        :lg="4"
        :xl="4">
        <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

export type FormType = 
  'text' |
  'select' |
  'date' |
  'time' |
  'dateTime' |
  'dateRange' |
  'dateTimeRange'
export type SelectOption = {
  label: string
  value: any
}
export type SearchFormListItem = {
  type: FormType
  label: string
  prop: string
  options?: SelectOption[]
}
type SearchParams = {
  [key: string]: any
}

defineProps<{
  formList: SearchFormListItem[]
}>()
const emits = defineEmits<{
  search: [searchParams: SearchParams]
}>()

// 响应式栅格
type viewportSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
const getColSpan = (size: viewportSize, column: SearchFormListItem) => {

  if(column.type === 'dateRange' || column.type === 'dateTimeRange') {
    switch(size) {
      case 'xs': return 24
      case 'sm': return 24
      case 'md': return 12
      case 'lg': return 8
      case 'xl': return 8
    }
  } else {
    switch(size) {
      case 'xs': return 24
      case 'sm': return 12
      case 'md': return 6
      case 'lg': return 4
      case 'xl': return 4
    }
  }
}

const formData = ref<SearchParams>({})

const search = () => {
  emits('search', formData.value)
}

</script>

<style lang="less" scoped>

.base_search {
  .el-col {
    margin-bottom: 8px;
  }
  :deep(.el-input, .el-select) {
    width: 100%;
  }
  :deep(.el-range-editor.el-input__wrapper) {
    width: calc(100% - 20px)
  }
}
</style>