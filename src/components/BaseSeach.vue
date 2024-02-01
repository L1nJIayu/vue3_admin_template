<template>
  <div class="base_search">
    <el-row>
      <el-col
        v-for="(item, index) in formList"
        :key="index">

        <!-- text -->
        <el-input
          v-if="item.type === 'text'"
          v-model="formData[item.prop]"
          :placeholder="item.label" />

        <!-- select -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.prop]"
          :placeholder="item.label">
          <el-option
            v-for="(o, i) in item.options"
            :label="o.label"
            :value="o.value"></el-option>
        </el-select>

        <!-- date -->
        <el-date-picker
          v-else-if="item.type === 'date'"
          v-model="formData[item.prop]"
          :placeholder="item.label"/>
        
        <!-- time -->
        <el-time-picker
          v-else-if="item.type === 'time'"
          v-model="formData[item.prop]"
          :placeholder="item.label"/>

        <!-- dateTime -->
        <el-date-picker
          v-else-if="item.type === 'dateTime'"
          type="datetime"
          v-model="formData[item.prop]"
          :placeholder="item.label"/>

        <!-- dateRange -->
        <el-date-picker
          v-else-if="item.type === 'dateRange'"
          type="daterange"
          v-model="formData[item.prop]"
          :placeholder="item.label"/>

        <!-- dateTimeRange -->
        <el-date-picker
          v-else-if="item.type === 'dateTimeRange'"
          type="datetimerange"
          v-model="formData[item.prop]"
          :placeholder="item.label"/>
        
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

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

defineProps<{
  formList: SearchFormListItem[]
}>()

const formData = ref<{
  [key: string]: any
}>({})

</script>