/*
 * @Author: 黄智强
 * @Date: 2018-05-03 10:02:19
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-09-18 15:05:31
 * @说明：主组件，使用keep-alive包裹，用于缓存组件，提高性能
 */
<template>
  <keep-alive>
    <router-view/>
  </keep-alive>
</template>
