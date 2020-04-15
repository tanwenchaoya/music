<template>
  <transition appear>
    <div class="account">
      <AccountHeader></AccountHeader>
        <AccountMiddle></AccountMiddle>
    </div>
  </transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountMiddle from '../components/Account/AccountMiddle'
export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountMiddle
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
.account{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color;
}
.v-enter{
  transform: translateY(100%);
}
.v-enter-to{
  transform: translate(0%,0%);
}
.v-enter-active{
  transition: transform 0.5s;
}
.v-leave{
  transform: translate(0%,0%);
}
.v-leave-to{
  transform: translateY(100%);
}
.v-leave-active{
  transition: transform 0.3s;
}
</style>
