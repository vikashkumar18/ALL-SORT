define([ 'jquery', 'underscore', 'backbone','d3','custom',
	'text!templates/bu-merge-sort.html'], 
	function($, _, Backbone,d3,custom,MergeSortTemplate)
	{
		var actualArray;
		var BUMergeSort= Backbone.View.extend({
			el: $("<div />"),
			initialize:function(){
				actualArray = this.options.data;
				
				
			},
			render:function(options){
				
				var template = _.template(MergeSortTemplate,options);
				this.$el.html(template);

				$("#code-div").html(this.$el);
				$.scrollToTag("id=code-div");
				

			},
			sort:function(){

				
				var
				    i,
				    j,
				    n = actualArray.length,
				    m = 1;

				// double the size each pass
				while (m < actualArray.length) {
				  i = j = 0; while (i < actualArray.length) j += this.merge(i, i += m, i += m);
				  if (j) this.options.passes.push(actualArray.slice());
				  else m <<= 1;
				
				    
				}
				console.log("array is::"+actualArray);
			},
				merge:function(low, middle, high){
				 
				 
				   middle = Math.min(actualArray.length, middle);
				   high = Math.min(actualArray.length, high);
				   for (; low < middle; low++) {
				     if (actualArray[low] > actualArray[middle]) {
				       var v = actualArray[low];
				       actualArray[low] = actualArray[middle];
				       this.insert(middle, high, v);
				       return true;
				     }
				   }
				   return false;



				},
				insert:function(start, end, v){
					  while (start + 1 < end && actualArray[start + 1] < v) {
					    var tmp = actualArray[start];
					    actualArray[start] = actualArray[start + 1];
					    actualArray[start + 1] = tmp;
					    start++;
					  }
					  actualArray[start] = v;
					}

		});
		return BUMergeSort;
	});