<template>
  <div
      class="card_container"
       @click="$router.push('/'+link)"
  >
    <img :src="img">
    <h5>{{name}}</h5>
  </div>
</template>

<script>
export default {
name: "gameDetails",
  props:['img','name','link']
}
</script>

<style scoped>
  .card_container{

    border-radius: 6px;
    cursor: pointer;
    background-color: aqua;
    padding: 14px;
    height: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 36px;
    font-weight: bold;
  }
  img{
    width:100%;
    height: 90%;
    background-color: white;
  }
</style>
