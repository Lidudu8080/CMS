<template>
  <div class="view">
    <el-card class="card">
      <div class="flex">
        <!-- <img class="avatar" src="../../assets/default-avatar.gif" alt="" /> -->
        <div>
          <h2>909089890</h2>
          <p style="margin-top: 5px">按时发萨法考了几分</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "activity",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.card {
  width: 329px;
  // height: 183px;
  // overflow: hidden;
  display: flex;
  align-items: center;
  .avatar {
    float: left;
    margin-right: 15px;
    width: 70px;
    height: 70px;
  }
  .name {
    color: #409eff;
    font-size: 20px;
    height: 28px;
    line-height: 28px;
    margin-top: 10px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .phone {
    font-size: 13px;
    height: 24px;
    line-height: 24px;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #eee;
    margin: 15px 0 8px;
  }
}
.flex {
  display: flex;
  align-items: center;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content-desc {
  margin-right: 10px;
  .sub-title {
    font-size: 30px;
    line-height: 42px;
    color: #333;
  }
  .title {
    width: 420px;
    font-size: 33px;
    line-height: 62px;
    color: #409eff;
  }
  .desc {
    font-size: 14px;
    color: #999;
  }
}
</style>
