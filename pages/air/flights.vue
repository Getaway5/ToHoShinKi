<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @cacheDataList="cacheDataList"/>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
     <FlightsAside />
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 航班总数据
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  computed: {
    dataList() {
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  },
  // 监听路由
  watch: {
    $route(){
      this.getData()
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    getData() {
      this.$axios({
        url: "/airs",
        method: "get",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        this.cacheFlightsData={...res.data}
        this.total = this.flightsData.flights.length;
      });
    },
    cacheDataList(arr){
      this.flightsData.flights=arr
    }
  },
  mounted() {
    this.getData()
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>