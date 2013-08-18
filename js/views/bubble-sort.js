define([ 'jquery', 'underscore', 'backbone','d3','custom',/*'shCore',
	'SyntaxHighlighter',*/
	'text!templates/bubble-sort.html'], 
	function($, _, Backbone,d3,custom,/*shCore,SyntaxHighlighter,*/BubbleSortTemplate)
	{
		var BubbleSortView = Backbone.View.extend({
			el: $("<div />"),
			initialize:function(){},
			render:function(options){
				
				var template = _.template(BubbleSortTemplate,options);
				this.$el.html(template);

				$("#code-div").html(this.$el);
				$.scrollToTag("id=code-div");
				

			},
			sort:function(){

				
				   
				    var a = this.options.data;					// referencing data with array a
				   
				   //sorting algo
				    var swapped;
				    do {
				        swapped = false;
				        for (var i=0; i < a.length-1; i++) {
				            if (a[i] > a[i+1]) {
				                var temp = a[i];
				                a[i] = a[i+1];
				                a[i+1] = temp;
				                swapped = true;
				                
				                
				            }

				        }
				        this.options.passes.push(a.slice());
				        
				    } while (swapped);
				    console.log(a);
				    
				}
			
			 });
			return BubbleSortView;
			});
