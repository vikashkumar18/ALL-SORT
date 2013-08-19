define([ 'jquery', 
	'underscore',
	 'backbone',
	 'd3',
	 'custom',
	 'views/bubble-sort',
	 'views/line-graph-view',
	 'views/hay-stack-view',
	 'views/top-down-merge-sort',
	 'text!templates/all-sort.html'], 
	function($,
	 _,
	  Backbone,
	  d3,
	  custom,
	  BubbleSortView,
	  LineGraphView,
	  HayStackGraphView,
	  TDMergeSortView,
	  AllSortTemplate)
	{

		var AllSortView = Backbone.View.extend({
			el : $('<div id="graph"/>'),
			events:{
				'click #line':'lineGraph',
				'click #hay-stack':'hayStackGraph',
				'click #refresh':'refresh',
				'click #code':'showCode'
			},
			initialize:function(){
				var n=240;
				this.pass;							// stores a single rearranged data sorted by algo.
				this.passes=[];							// stores all rearranged data sorted by algo.
				this.view=null;
				this.sortType= null;
				this.transitionView=null;
				this.token=null;
				this.cancelPreviousUpdate=false;
				this.duration=null;					// duration after which transition will occur
				this.data = d3.shuffle(d3.range(n)); //shuffle data for line 
				this.model = new Backbone.Model();	// actual data encapsulated in model to send to other views
				_.bindAll(this,'render','refresh','drawLineTransition','drawHayStackTransition','lineGraph','hayStackGraph');

				
		
		
		
	},
	
	
	
	render:function(obj){
		//$.scrollToTag("id=content");
		
		this.cancelPreviousUpdate=true;
		this.sortType = obj.sortType;
		var template = _.template(AllSortTemplate);	
		
		this.$el.html(template);					//appending template to view's element.
		$("#content").html(this.$el);				//adding view's element to content
		this.delegateEvents();
		$("#line").trigger('click');

	},

	

	lineGraph:function(){
		
		$.defaultHorizontalNav(1);
		this.token="lg";
		this.cleanCodeArea();
				if(this.sortType==undefined || this.sortType=="bbs"){
					this.cancelPreviousUpdate=true;
					$.defaultSideMenu(1);
					$("#sort-head").text("Bubble-Sort");
					if(!(this.view instanceof BubbleSortView)){ // clear the passes array to store the new arrangement of sorted data
					this.passes = [];
					this.callBubbleSort();

					}

					setTimeout(this.drawLineTransition,this.duration+10);
										
				}else if(this.sortType=="tms"){
					console.log("tms");
					this.cancelPreviousUpdate=true;
					$.defaultSideMenu(2);
					$("#sort-head").text("Top-Down Merge Sort");
					if(!(this.view instanceof TDMergeSortView)){ // clear the passes array to store the new arrangement of sorted data
					this.passes = [];
					this.callTDMergeSort();

					}

					setTimeout(this.drawLineTransition,this.duration+10);
				}

		
	},
	hayStackGraph:function(){
		
		$.defaultHorizontalNav(2);
		this.token="hs";
		this.cleanCodeArea();
		if(this.sortType==undefined || this.sortType=="bbs"){
			this.cancelPreviousUpdate=true;
			$.defaultSideMenu(1);
			$("#sort-head").text("Bubble-Sort");
			if(!(this.view instanceof BubbleSortView)){ // clear the passes array to store the new arrangement of sorted data
				this.passes = [];
				this.callBubbleSort();

			}
			setTimeout(this.drawHayStackTransition,this.duration+10);
								
		} else if(this.sortType=="tms"){
			this.cancelPreviousUpdate=true;
			$.defaultSideMenu(2);
			$("#sort-head").text("Top-Down Merge Sort");
			if(!(this.view instanceof TDMergeSortView)){ // clear the passes array to store the new arrangement of sorted data
			this.passes = [];
			this.callTDMergeSort();

			}

			setTimeout(this.drawHayStackTransition,this.duration+10);
		}
	},
	callBubbleSort:function(){
		this.view = new BubbleSortView({passes:this.passes,data:this.data.slice()});
		this.view.sort();		

	},
	callTDMergeSort:function(){
		this.view = new TDMergeSortView({passes:this.passes,data:this.data.slice()});
		this.view.sort();
	},
	drawLineTransition:function(){
		console.log("func called");
		this.cancelPreviousUpdate=false;
		var pass;											
		var passes;
		passes=this.passes.slice().reverse();
		this.duration = 250;
				
		if(this.transitionView){
		 this.transitionView.remove();
		 //this.cancelPreviousUpdate=false;
		}else{

		}
		this.model.set({data:this.data});
		this.transitionView = new LineGraphView({duration:this.duration,model:this.model});// shows the initial random distribute data	
		
		var that=this;
		update();
		function update(){							// 
			console.log("length :"+passes.length);
			if(that.cancelPreviousUpdate){
				console.log("cancel");
				that.cancelPreviousUpdate=false;
				return;
			}
			
			pass = passes.pop();
			that.model.set({data:pass});
			if(passes.length!=0){
			setTimeout(update,that.duration);
		}

		}
		
		
		
	},
	drawHayStackTransition:function(){
		
		var pass;											
		var passes;
		this.cancelPreviousUpdate=false;
		passes=this.passes.slice().reverse();
		this.duration = 250;
				
		if(this.transitionView){
		 this.transitionView.remove();
		}else{
		//	this.cancelPreviousUpdate=false;
		}
		
		this.model.set({data:this.data});
		this.transitionView = new HayStackGraphView({duration:this.duration,model:this.model});// shows the initial random distribute data	
		var that=this;
		update();
		function update(){		
			if(that.cancelPreviousUpdate){
				that.cancelPreviousUpdate=false;
				return;	
			}
							// 
			console.log("length :"+passes.length);
			pass = passes.pop();
			that.model.set({data:pass});
			if(passes.length!=0){
			setTimeout(update,that.duration);
		}

		}
		
		
		

	},
	refresh:function(){
		this.cancelPreviousUpdate=true;
		if(this.token=="hs"){
			/*calling after extra 10 ms of duration so that previous
				update function could stop first. 
				all JS functions that takes functions as arguments
				like (setTimeout) takes method reference i.e.  'this.func' not
				method call i.e. this.func(). 
			*/
			setTimeout(this.drawHayStackTransition,this.duration+10); 
		}else{
			
			setTimeout(this.drawLineTransition,this.duration+10);
		}
		
	},
	showCode:function(){
		console.log("sc");
		this.view.render({token:this.token});
	},
	cleanCodeArea:function(){
		$("#code-div").empty();
	}


 });
return AllSortView;
});
