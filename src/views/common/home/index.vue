<template>
  <ElRow class="my-4" justify="center">
    <ElCol :span="18">
      <div class="rounded-2xl bg-opacity-40 bg-white p-4 mt-6 w-full">
        <ElRow justify="center">
          <ElText class="text-3xl">
            欢迎来到
            <ElLink
              class="text-3xl"
              :href="`https://space.bilibili.com/${id}`"
              target="_blank"
              :underline="false"
            >
              {{ VID2VName[id] }}
            </ElLink>
            的歌单
          </ElText>
        </ElRow>
        <ElRow justify="center">
          <ElText class="text-xl">共收录 {{ MusicTable[id].length }} 首歌曲</ElText>
        </ElRow>
      </div>
    </ElCol>
  </ElRow>
  <ElRow justify="center">
    <ElCol :span="18">
      <div class="rounded-2xl bg-opacity-40 bg-white p-4 my-2 w-full">
        <ElRow class="rounded-2xl bg-opacity-80 bg-white mb-4 p-4">
          <ElInput class="w-1/4 mx-2.5 opacity-90 text-xl" v-model="songName" size="large" placeholder="请输入歌曲名称" />
          <ElSelect class="w-1/6 mx-2.5" v-model="singerName" size="large" placeholder="所有歌手" filterable>
            <ElOption label="所有歌手" value="" />
            <ElOption v-for="(value, key) of singerOption" :label="`${key}(${value})`" :value="key" />
          </ElSelect>
          <ElSelect class="w-1/6 mx-2.5 opacity-90" v-model="languageName" size="large" placeholder="所有语言">
            <ElOption label="所有语言" value="" />
            <ElOption v-for="(value, key) of languageOption" :label="`${key}(${value})`" :value="key" />
          </ElSelect>
          <ElSelect class="w-1/6 mx-2.5 opacity-90" v-model="typeName" size="large" placeholder="所有风格">
            <ElOption label="所有风格" value="" />
            <ElOption v-for="(value, key) of typeOption" :label="`${key}(${value})`" :value="key" />
          </ElSelect>
          <ElSelect class="w-1/6 mx-2.5 opacity-90" v-model="priceName" size="large" placeholder="所有价格">
            <ElOption label="所有价格" value="" />
            <ElOption v-for="(value, key) of priceOption" :label="key !== '0' ? `${key}(${value})` : `免费(${value})`" :value="key" />
          </ElSelect>
        </ElRow>
        <ElTable
          class="rounded-xl text-lg opacity-80 font-bold"
          :data="filterTableData"
          :defaultSort="{ prop: 'price', order: 'ascending' }"
          size="large"
          height="660px">
          <template #empty>
            <div>暂时没有数据哦！</div>
          </template>
          <ElTableColumn prop="song" label="歌名" />
          <ElTableColumn prop="singer" label="歌手" />
          <ElTableColumn prop="language" label="语言" />
          <ElTableColumn prop="type" label="风格" />
          <ElTableColumn prop="price" label="价格" sortable>
            <template #default="scope">
              <ElTag
                class="text-lg font-light"
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
                <template v-else-if="scope.row.price === 198">
                  <span>舰限</span>
                </template>
                <template v-else>
                  <span>SC ￥{{ scope.row.price }}</span>
                </template>
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="description" label="备注">
            <template #default="scope">
              <template v-if="scope.row.description !== ''">
                <ElLink
                  class="text-lg font-bold"
                  :href="`https://www.bilibili.com/video/${scope.row.description.split('-')[0]}`"
                  target="_blank"
                  :underline="false"
                >
                  {{ scope.row.description.split('-')[1] }}
                </ElLink>
              </template>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCol>
  </ElRow>
</template>
<script lang="ts" setup>
import { MusicTable, Price2Tag, VID2VName } from "@/utils/DataSets";
import type { ITableData } from "@/models";

const route = useRoute();

const id = ref(route.params.id.toString());
const songName = ref("");
const singerName = ref("");
const languageName = ref("");
const typeName = ref("");
const priceName = ref("");
const filterTableData = computed(() =>
    tableData.data.filter((data) =>
        (!songName.value || data.song.includes(songName.value)) &&
        (!singerName.value || data.singer.includes(singerName.value)) &&
        (!languageName.value || data.language.includes(languageName.value)) &&
        (!typeName.value || data.type.includes(typeName.value)) &&
        (!priceName.value || data.price.toString().includes(priceName.value))
    )
);

const tableData = reactive({
  data: MusicTable[id.value] as ITableData[]
});

const options = () => {
  let singerOption = {};
  let languageOption = {};
  let typeOption = {};
  let priceOption = {};
  MusicTable[id.value].forEach((v) => {
    if (v.singer.split("、").length > 1) {
      const singers = v.singer.split("、");
      singers.forEach((val) => {
        if (!singerOption[val]) singerOption[val] = 1;
        else singerOption[val]++;
      });
    } else {
      if (!singerOption[v.singer]) singerOption[v.singer] = 1;
      else singerOption[v.singer]++;
    }
    if (!languageOption[v.language]) languageOption[v.language] = 1;
    else languageOption[v.language]++;
    if (!typeOption[v.type]) typeOption[v.type] = 1;
    else typeOption[v.type]++;
    if (!priceOption[v.price]) priceOption[v.price] = 1;
    else priceOption[v.price]++;
  });
  return { singerOption, languageOption, typeOption, priceOption };
};

const { singerOption, languageOption, typeOption, priceOption } = options();
</script>