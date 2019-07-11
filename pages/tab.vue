<template>
  <div>
    <div class="box1">
      <span v-for="(item,index) in ['新闻','音乐','游戏']"
       :key="index"
       @click="handleClick(index)"
       :class="{active:current===index}"
       >{{item}}</span>
    </div>

    <div v-if="current===0">
      <ul>
        <li>1111111</li>
        <li>1111111</li>
        <li>1111111</li>
      </ul>
    </div>

    <div v-if="current===1">
      <ul>
        <li>2222222</li>
        <li>2222222</li>
        <li>2222222</li>
      </ul>
    </div>

    <div v-if="current===2">
      <ul>
        <li>3333333</li>
        <li>3333333</li>
        <li>3333333</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current:0
    };
  },
  methods: {
    handleClick(index){
      this.current=index
    }
  }
};
</script>

<style>
span{
  cursor: pointer;
}
.active{
  color:red;
}
</style>