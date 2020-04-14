$(document).ready(function(){
  $('.deletepost').on('click', function(e){
  $target = $(e.target);
  const id = $target.attr('data-id');
  $.ajax({
      type: 'DELETE',
      url: '/posts/'+ id,
      
      success: function(response){
          alert('Deleting post');
          window.location.href='/posts';
           
      },
      error : function(err){
          console.log(err)
      }
  });
});
});