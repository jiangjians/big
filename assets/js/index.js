$(function() {
  getUserInfo()
});

const layer = layui.layer;

function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: (res) => {
      console.log(res)
      if (res.status !== 0) return layer.msg("数据请求失败！");
      layer.msg("数据请求成功！");
      renderAvatar(res.data)
    }
  })
}
// 渲染用户头像
const renderAvatar = (user) => {
  // 获取用户名字
  const name = user.nickname || user.username
  // 设置欢迎文本
  $('#welcome').html(`欢迎${name}`)
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide();
    const firstName = name[0].toUpperCase()
    $('.text-avatar').html(firstName).show()
  }
}