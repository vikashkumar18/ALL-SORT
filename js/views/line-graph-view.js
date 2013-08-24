define([ 'jquery', 'underscore', 'backbone','d3','custom'], 
	function($, _, Backbone,d3,custom)
	{
		var LineGraphView= Backbone.View.extend({
			el: $("<div />"),
			initialize:function(){
				_.bindAll(this,'render','lineGraphTransform');
				this.listenTo(this.model,'change',this.render);
				$("#svg").html(this.$el);
				var w = $("#graph").width();
				var svgHeight = 350;
				h = 50;
				this.space=h;
				this.data = this.model.get('data');
				if(this.data.array!=undefined)
					this.data = this.data.array;
				this.duration = this.options.duration;
				var n = 240;

				var height = d3.scale.linear().domain([0,n]).range([5,245]);
				this.x = d3.scale.linear().domain([0, n]).range([h, w - h]);
				this.a = d3.scale.linear().domain([0, n - 1]).range([90 + 60, 270 - 60]);
				
				
				$("<svg style='width:100%;height:"+svgHeight+"'/>").insertAfter("#svg div");
				var svg = d3.select("svg");

				this.line = svg.selectAll("line")
				.data(this.data)
				.enter().append("line")
				.attr("x1", 0)
				.attr("y1", 245)
				.attr("x2", 0)
				.attr("y2", function(d){return (245-height(d));})
				.attr("transform", this.lineGraphTransform);
			},
			render:function(){
				var that = this;
				this.data = this.model.get('data');
				if(this.options.view == "QuickSort"){
					this.line.data(this.data.array, Number)
					.attr("stroke",function(i){
					      if(i>=that.data.start && i<=that.data.end){
					        
					        return "green";
					      }else if(i==that.data.pivot){
					        return "red";
					      }else{
					      	return "black";
					      }
					    })
					.transition()
					.duration (this.duration)
					.attr("transform", this.lineGraphTransform);
				}else if(this.data.array!= undefined){
					this.line.data(this.data.array, Number)
					.attr("stroke",function(i){
					      if(i>=that.data.start && i<=that.data.pivot){
					        
					        return "green";
					      }else if(i>that.data.pivot && i<=that.data.end){
					        return "orange";
					      }else{
					        return "black";
					      }
					    })
					.transition()
					.duration (this.duration)
					.attr("transform", this.lineGraphTransform);

				}else{
					this.line.data(this.data, Number)
					.attr("stroke",function(i){
					      
					        return "black";
					      
					    })
					.transition()
					.duration (this.duration)
					.attr("transform", this.lineGraphTransform);

				}
				

			},
			lineGraphTransform:function(d,i){
 			return "translate(" + this.x(i) + "," + this.space + ")";

			}

	});
return LineGraphView;
});