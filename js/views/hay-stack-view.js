define([ 'jquery', 'underscore', 'backbone','d3','custom'], 
	function($, _, Backbone,d3,custom)
	{
		var HayStackGraphView= Backbone.View.extend({
			el: $("<div />"),
			initialize:function(){
				_.bindAll(this,'render','lineGraphTransform');
				this.listenTo(this.model,'change',this.render);
				$("#svg").html(this.$el);
				var w = $("#graph").width();
				

				var svgHeight = 350;
				this.h = 100;
				this.space=this.h;
				this.data = this.model.get('data');
				this.duration = this.options.duration;
				var n = 240;

				var height = d3.scale.linear().domain([0,n]).range([5,245]);
				this.x = d3.scale.linear().domain([0, n]).range([50, w - 50]);
				this.a = d3.scale.linear().domain([0, n - 1]).range([-30, 30]);
				
				
				$("<svg style='width:100%;height:"+svgHeight+"'/>").insertAfter("#svg div");
				var svg = d3.select("svg");

				this.line = svg.selectAll("line")
				.data(this.data)
				.enter().append("line")
				.attr("x1", 0)
				.attr("y1", 100)
				.attr("x2", 0)
				.attr("y2", 100+this.h)
				.attr("transform", this.lineGraphTransform);
			},
			render:function(){
				this.data = this.model.get('data');
				this.line.data(this.data, Number)
				.transition()
				.duration (this.duration)
				.attr("transform", this.lineGraphTransform);

			},
			lineGraphTransform:function(d,i){
 			return "translate(" + this.x(i) + ")rotate(" + this.a(d) + ","+0+","+(100+this.h)+")";

			}

	});
return HayStackGraphView;
});