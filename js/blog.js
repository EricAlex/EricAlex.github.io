var commentref = new Wilddog("https://xinwangcomments.wilddogio.com/comments/");
var commentpostRef = commentref.child(slugify(window.location.pathname));

commentpostRef.on("child_added", function(snapshot) {
  var newPost = snapshot.val();
  $(".comments").prepend('<div class="comment">'
   + '<div class="profile-image" ><img class="image" src="http://www.gravatar.com/avatar/' 
   + newPost.md5Email + '?s=80&d=retro" /></div>' 
   + '<div class="info"><h4>' + newPost.name + "</h4>" + '<span class="date">' + moment(newPost.postedAt).fromNow() + 
   "</span></div>" 
   + '<div class="content"><p>' + newPost.message + "</p></div></div>")
});

var usernameInput = document.getElementById('rlCmtsInputUsername'),
    contentInput = document.getElementById('rlCmtsInputContent'),
    emailInput = document.getElementById('rlCmtsInputEmail'),
    submitBtn = document.getElementById('rlCmtsSubmit');

submitBtn.addEventListener('click', function () {
  var userName = usernameInput.value.trim();
  var content = contentInput.value;
  var email = emailInput.value.trim();
  if (userName.length > 100) {
    return alert('用户名不能超过100个字符');
  }
  if (userName == '') {
    return alert('用户名不能为空');
  }
  if (content.length > 1000) {
    return alert('评论内容不能超过1000个字符');
  }
  if (content.trim() == '') {
    return alert('评论内容不能为空');
  }
  commentpostRef.push({
    name: userName,
    message: content,
    md5Email: md5(email),
    postedAt: Wilddog.ServerValue.TIMESTAMP
  });

  $("input[type=text], textarea").val("");
});

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'');
}