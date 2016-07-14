var likepostRef = new Wilddog("https://xinwangblog.wilddogio.com/kudos/");

var wilddogAuthData;

likepostRef.onAuth(function(data) {
    wilddogAuthData = data;
    if (wilddogAuthData) {
        console.log(wilddogAuthData);
    } else {
        likepostRef.authAnonymously( function(err,data){ 
        	if(err == null){
        		wilddogAuthData = data;
        		console.log("Authenticated Anonymously:", data);
        	}
        	else
        	{
        		console.log("Authentication failed.");
        	}
        });
    }
});

window.onload = function () {
document.body.insertAdjacentHTML( 'beforeEnd', '<iframe id="my-like-frame" style="display:none;"></iframe>' );
document.addEventListener( 'click', function ( event ) {
    var myLike = event.target;
    if( myLike.className.indexOf( 'my-like' ) > -1 ) {
        var frame = document.getElementById( 'my-like-frame' ),
            liked = ( myLike.className == 'my-liked' ),
            command = liked ? 'unlike' : 'like',
            reblog = myLike.getAttribute( 'data-reblog' ),
            id = myLike.getAttribute( 'data-id' ),
            oauth = reblog.slice( -8 );
        frame.src = 'http://www.tumblr.com/' + command + '/' + oauth + '?id=' + id;
        liked ? myLike.className = 'my-like' : myLike.className = 'my-liked';

        var key = slugify(window.location.pathname + id);
        var uid = wilddogAuthData.auth.uid;
        if(liked)
        {
        	likepostRef.child(key).child('likes').child(uid).remove();
        }
        else
        {
        	likepostRef.child(key).child('likes').child(uid).set({count: 1});
        }
    };
}, false );
};

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'');
}