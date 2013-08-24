
define([ 'jquery', 'underscore', 'backbone','d3','custom',
	'text!templates/td-merge-sort.html'], 
	function($, _, Backbone,d3,custom,MergeSortTemplate)
	{
		var actualArray,helperArray;
		var TDMergeSortView = Backbone.View.extend({
			el: $("<div />"),
			initialize:function(){
				actualArray = this.options.data;
				helperArray = [];
				
			},
			render:function(options){
				
				var template = _.template(MergeSortTemplate,options);
				this.$el.html(template);

				$("#code-div").html(this.$el);
				$.scrollToTag("id=code-div");
				

			},
			sort:function(){

				var low = 0;
				var high = actualArray.length-1;
				this.mergeSort(low,high);
				console.log("array "+actualArray);
				
				    
				},
				mergeSort:function(low,high){
				  
				  if(low<high){
				    var middle = Math.floor(low + (high-low)/2);
				    
				    
				    this.mergeSort(low, middle);
				    
				    this.mergeSort(middle+1, high);
				    this.merge(low,middle, high);
				   
				  }
				},
				merge:function(low, middle, high){
				 
				  var i=0,j=0,k=0,data;
				 
				  for(i=low;i<=high;i++){
				    helperArray[i]=actualArray[i];
				  }

				  i=low, j=middle+1, k=low;

				  while(i<=middle && j<=high){
				    if(helperArray[i]<=helperArray[j]){
				      actualArray[k] = helperArray[i];
				      i++;
				    }else{
				      actualArray[k]=helperArray[j];
				      j++;
				    }
				    k++;
				  }
				  while(i<=middle){
				    actualArray[k] = helperArray[i];
				    i++;
				    k++;
				  }
				  // array.slice() is used to push new instance of array.
				  // pushing just the array will not do as in JS everything is pass by reference so in the end all 
				  // the items pushed will refer to the final sorted array.
				  data={
				    array : actualArray.slice(),
				    start: low,
				    end: high,
				    pivot:middle
				  }
				   this.options.passes.push(data);



				}

				
				
			
			 });
			 
			

			return TDMergeSortView;
			});
 