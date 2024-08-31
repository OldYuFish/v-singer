<template>
  <ElRow justify="center">
    <ElCol :span="18">
      <div class="rounded bg-opacity-40 bg-white p-4 mt-6 w-full">
        <ElRow justify="center">
          <ElText class="text-3xl">
            欢迎来到
            <ElLink
              class="text-3xl"
              :href="`https://space.bilibili.com/${route.params.id}`"
              :underline="false"
            >
              {{ VID2VName[route.params.id as string] }}
            </ElLink>
            的歌单
          </ElText>
        </ElRow>
      </div>
    </ElCol>
  </ElRow>
  <ElRow justify="center">
    <ElCol :span="18">
      <div class="rounded bg-opacity-40 bg-white p-4 my-2 w-full">
        <ElTable class="bg-opacity-60 rounded" :data="filterTableData" size="large">
          <template #empty>
            <div>暂时没有数据哦！</div>
          </template>
          <ElTableColumn prop="song" label="歌名" />
          <ElTableColumn prop="singer" label="歌手" />
          <ElTableColumn prop="language" label="语言" />
          <ElTableColumn prop="type" label="风格" />
          <ElTableColumn prop="price" label="价格" >
            <template #default="scope">
              <ElTag
                  :style="{ borderColor: Price2Tag[scope.row.price] }"
                  :key="scope.row.price"
                  :color="Price2Tag[scope.row.price]"
                  effect="dark"
                  size="large"
                  round
              >
                <template v-if="scope.row.price === 0">
                  <span>免费</span>
                </template>
                <template v-else>
                  <span>SC ￥{{ scope.row.price }}</span>
                </template>
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="description" label="备注" />
          <ElTableColumn align="right">
            <template #header>
              <ElInput v-model="songName" placeholder="请输入歌曲名称" />
            </template>
          </ElTableColumn>
        </ElTable>
        <div class="flex justify-end pt-4 pb-3 rounded-b bg-white">
          <ElPagination
              v-model:currentPage="tableData.pageConfig.pageIndex"
              v-model:pageSize="tableData.pageConfig.pageSize"
              background
              layout="total, prev, pager, next, sizes, jumper"
              :pageSizes="[10, 20, 30, 50, 70, 100, 150, 200, 300, 500, 1000]"
              :total="tableData.pageConfig.total"
              :hideOnSinglePage="true"
          ></ElPagination>
        </div>
        <div v-if="tableData.loading" class="absolute left-0 top-0 w-full h-full bg-gray-300 bg-opacity-30 z-10">
          <ElIcon class="spin absolute inset-0 m-auto text-3xl text-blue-400">
            <Loading class="align-baseline" />
          </ElIcon>
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>
<script lang="ts" setup>
import { Loading } from "@element-plus/icons-vue";
import { MusicTable, Price2Tag, VID2VName } from "@/utils/DataSets";
import type { ITableData } from "@/models";

const route = useRoute();

const songName = ref("");
const filterTableData = computed(() =>
    tableData.data.filter((data) =>
        !songName.value || data.song.includes(songName.value)
    )
);

const tableData = reactive({
  loading: false,
  data: MusicTable as ITableData[],
  pageConfig: {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  } as IPagination,
});
</script>