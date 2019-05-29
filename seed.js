var mongoose   =  require('mongoose'),
campground     =  require('./model/Campground'),
comment        =  require('./model/Comment')

var data =[
              {
               	name:"Tso Moriri Lake, Ladakh",
                image : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Tsomoriri_Lake.jpg/320px-Tsomoriri_Lake.jpg",
                description:"Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime. The lake is completely frozen during the winters and is an excitingly unique thing to witness. The best time to camp here is during May to September and it is simply wonderful to spend time in the decorated tents. You can trek in the nearby Ladakh region and witness the mesmerizing sunset at the lake. The best part is that the tents are comfortable with electricity supply."
              },
              {
               	name : "Exotica", 
               	image : "https://images.unsplash.com/photo-1506404214625-2c59d5e6e912?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
               	description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend, diam quis congue dictum, neque mi molestie est, vestibulum commodo diam sem quis nisi. Vivamus lobortis lorem non enim placerat aliquet. Maecenas sed mauris sit amet lectus scelerisque congue congue sit amet eros. Curabitur nec volutpat sapien. Praesent accumsan, est quis iaculis egestas, velit enim dignissim justo, eu ultricies enim nisi at neque. Cras sapien velit, varius a consectetur non, hendrerit at libero. Maecenas dictum eros vitae viverra porta. Praesent faucibus nunc nunc, eget faucibus leo imperdiet at. Mauris ac ornare ex. Nunc mollis dolor in nulla suscipit, a pharetra felis semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec lacinia massa et ex gravida, id posuere tellus lobortis. Quisque vel urna libero."
              },
	          {
	           	name : "Cloudeburst", 
	            image : "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend, diam quis congue dictum, neque mi molestie est, vestibulum commodo diam sem quis nisi. Vivamus lobortis lorem non enim placerat aliquet. Maecenas sed mauris sit amet lectus scelerisque congue congue sit amet eros. Curabitur nec volutpat sapien. Praesent accumsan, est quis iaculis egestas, velit enim dignissim justo, eu ultricies enim nisi at neque. Cras sapien velit, varius a consectetur non, hendrerit at libero. Maecenas dictum eros vitae viverra porta. Praesent faucibus nunc nunc, eget faucibus leo imperdiet at. Mauris ac ornare ex. Nunc mollis dolor in nulla suscipit, a pharetra felis semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec lacinia massa et ex gravida, id posuere tellus lobortis. Quisque vel urna libero."
	          },
	          {
	           	name : "WanderLust", 
	            image : "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend, diam quis congue dictum, neque mi molestie est, vestibulum commodo diam sem quis nisi. Vivamus lobortis lorem non enim placerat aliquet. Maecenas sed mauris sit amet lectus scelerisque congue congue sit amet eros. Curabitur nec volutpat sapien. Praesent accumsan, est quis iaculis egestas, velit enim dignissim justo, eu ultricies enim nisi at neque. Cras sapien velit, varius a consectetur non, hendrerit at libero. Maecenas dictum eros vitae viverra porta. Praesent faucibus nunc nunc, eget faucibus leo imperdiet at. Mauris ac ornare ex. Nunc mollis dolor in nulla suscipit, a pharetra felis semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec lacinia massa et ex gravida, id posuere tellus lobortis. Quisque vel urna libero."
              }
            ]


function seedDB(){
	campground.remove({},function(err){
		if(err){
			console.log(err)
		}
		else{
			console.log("campgrounds removed");
			data.forEach(function(camp){
				campground.create(camp,function(err,retcamp){
					if(err){
						console.log(err)
					}
					else{
						console.log("Campground added");
						comment.create(
						  {
                             author:"cafeshoes",
                             body  :"This place is great,but I wish there was internet"
						  }, function(err,retcomment){
						  	if(err){
						  		console.log(err)
						  	}
						  	else{
						  		console.log("comment created");
						  		retcamp.comments.push(retcomment);
						  		retcamp.save()
						  			console.log("campground with comment created");
						  		
						  	}
						  }
						)
					}
				})
			})
		}
	})
}

module.exports=seedDB;