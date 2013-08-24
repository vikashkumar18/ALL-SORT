define([ 'jquery', 'underscore', 'backbone','d3','custom',
	'text!templates/quick-sort.html'], 
	function($, _, Backbone,d3,custom,QuickSortTemplate)
	{
		var actualArray;
		var QuickSortView= Backbone.View.extend({
			el: $("<div />"),
			initialize:function(){
				actualArray = this.options.data;
				helperArray = [];
				
			},
			render:function(options){
				
				var template = _.template(QuickSortTemplate,options);
				this.$el.html(template);

				$("#code-div").html(this.$el);
				$.scrollToTag("id=code-div");
				

			},
			sort:function(){
				var start = 0;
				var end= actualArray.length -1;
				
				this.quickSort(start,end);
	
				    
				},
				quickSort:function(start,end){
				  
				   var data;
				   var i= start;
				   var k = end;
				   var diff = end -start;
				   //console.log("start "+start+" end "+end);
				   if(diff >= 1){
				 var pivot = actualArray[start];
				   //console.log("pivot "+pivot);
				     while(k>i){    // till right--> left index is greater than left--> right index
				         while(actualArray[i]<=pivot && i<=end && k>i){  //from the left look for first element 
				           i++;                                          //greater than pivot
				         }
				         while(actualArray[k]>pivot && k>=start && k>=i){ // from the right look for first element
				           k--;                                            // smaller than pivot
				         }
				         if(k>i){
				           this.swap (i,k);
				           data = {
				             array : actualArray.slice(),
				             pivot : start,
				             start  : start+1,
				             end   : end
				           }
				           this.options.passes.push(data);
				         }
				         

				     }
				     this.swap (start,k);
				      data = {
				             array : actualArray.slice(),
				             pivot : k,
				             start  : start,
				             end   : end
				           }
				           this.options.passes.push(data);
				     this.quickSort(start,k-1);
				     this.quickSort(k+1,end);
				   }
				    else{
				     return;
				    }
				    
				},
				swap:function(i,j){
					var temp = actualArray[i];
					actualArray[i]=actualArray[j];
					actualArray[j]=temp;
				}
		});
		return QuickSortView;
	});