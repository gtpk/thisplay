;(function (window, d3) {
	'use strict';

	function Queue(target) {
    d3 = d3 || window.d3;
		
		var queue;
		var queueData = [];
		var front = 0;
		var rear = 0;
		var rectWidth = 80;
		var rectHeight = 80;
		var padding = 5;
		var width = 1000;
		var height = 700;

    var container = d3.select(target)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("id","container")
			.append("g");

    var zoom = d3.zoom()
      .scaleExtent([0.1, 10])
      .on("zoom", function () {
        container.attr("transform", d3.event.transform);
      });

    d3.select(target).call(zoom);

		this.container = container;
		this.target = target;
		this.queue = queue;
		this.queueData = queueData;
		this.front = front;
		this.rear = rear;
		this.rectWidth = rectWidth;
		this.rectHeight = rectHeight;
		this.padding = padding;
		
		
		var that = this;
		this.mouseOver = function (d,i) {
			
			d3.select("#rectIdx"+i)
				.attr("fill","#FA812F")
				.attr("width", that.rectWidth*1.1)
				.attr("height", that.rectHeight*1.1)
				.attr("transform","translate("+(-that.rectHeight*0.05)+","+(-that.rectWidth*0.05)+")");

			
			that.queue.append("text")
				.text("↑")
				.attr("font-family","Consolas")
				.attr("font-size","20px")
				.attr("fill","black")
				.attr("text-anchor","middle")
				.attr("id","arrow")
				.attr("x",function(){return 100+(that.rectWidth+that.padding)*(that.front+i) +that.rectWidth/2;})
				.attr("y",function(){return 300+that.rectHeight*1.3;})
			
			that.queue.append("text")
				.text(function(){return "queue["+(that.front+i)+"] = "+ that.queueData[i];})
				.attr("font-family","Consolas")
				.attr("font-size","20px")
				.attr("fill","black")
				.attr("text-anchor","middle")
				.attr("id","arrInfo")
				.attr("x",function(){return 100+(that.rectWidth+that.padding)*(that.front+i) +that.rectWidth/2;})
				.attr("y",function(){return 300+that.rectHeight*1.6;})
		};

		this.mouseOut = function (d,i) {
			d3.select(this)
				.attr("fill","#FAAF08")
				.attr("width",that.rectWidth)
				.attr("height",that.rectHeight)
				.attr("transform","translate(0,0)");

			d3.select("#arrInfo").remove();
			d3.select("#arrow").remove();
		};
  }

  Queue.prototype.Push = function (_value) {
		var newElem;

		this.rear++;
		this.queueData.push(_value);
		
		var position = (this.rectWidth+this.padding)*(this.rear-1)+100;
		var distance = 300;
		var that = this;
		newElem = this.container.append("g");
		newElem.append("rect")
			.attr("x", position + distance)
			.attr("y",300)
			.attr("width", this.rectWidth)
			.attr("height",this.rectHeight)
			.attr("fill","#FAAF08")
			.attr("rx",10)
			.attr("ry",10);

		newElem.append("text")
			.text(_value)
			.attr("x",function(){return position+distance+that.rectWidth/2;})
		 	.attr("y",function(){return 300+that.rectHeight/5*3;})
			.attr("fill","black")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("text-anchor","middle");
					
		newElem.transition().duration(300)
			.attr("transform","translate("+(-distance)+",0)").ease(d3.easeSinOut);
		
		setTimeout(function(){
			newElem.remove().exit();
			that.drawQueue();
		},300);			
  };

  Queue.prototype.Pop = function () {
		var that = this;
    if(this.front == this.rear)
			return ;

		var newElem;
		var _value = this.queueData[0];

		this.front++;
		
		this.queueData = this.queueData.slice(1,this.queueData.length);
		
		this.drawQueue();
				
		var position = (this.rectWidth + this.padding)*(this.front-1)+100;
		var distance = 300;

		newElem = this.container.append("g");
		 newElem.append("rect")
			.attr("x", position)
		 	.attr("y",300)
			.attr("width", this.rectWidth)
			.attr("height", this.rectHeight)
			.attr("fill","#FAAF08")
			.attr("rx",10)
			.attr("ry",10);

		newElem.append("text")
			.text(_value)
			.attr("x",function(){return position + that.rectWidth/2;})
		 	.attr("y",function(){return 300 + that.rectHeight/5*3;})
			.attr("fill","black")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("text-anchor","middle");
		
		//var distance = -300;
		newElem.transition().duration(300)
			.attr("transform","translate("+ (-distance)+",0)").ease(d3.easeSinOut);
								
		setTimeout(function(){
			newElem.remove().exit();
			that.drawQueue();
		},300);			
  };
	
	Queue.prototype.Clear = function () {
		
    if(this.front == this.rear)
			return ;
		while(this.front != this.rear)
		{
			var that = this;
			var newElem;
			var _value = this.queueData[0];

			this.front++;
			
			this.queueData = this.queueData.slice(1,this.queueData.length);
			
			this.drawQueue();
					
			var position = (this.rectWidth + this.padding)*(this.front-1)+100;
			var distance = 300;

			newElem = this.container.append("g");
			 newElem.append("rect")
				.attr("x", position)
				.attr("y",300)
				.attr("width", this.rectWidth)
				.attr("height", this.rectHeight)
				.attr("fill","#FAAF08")
				.attr("rx",10)
				.attr("ry",10);

			newElem.append("text")
				.text(_value)
				.attr("x",function(){return position + that.rectWidth/2;})
				.attr("y",function(){return 300 + that.rectHeight/5*3;})
				.attr("fill","black")
				.attr("font-family","Consolas")
				.attr("font-size","20px")
				.attr("text-anchor","middle");
			
			//var distance = -300;
			newElem.transition().duration(300)
				.attr("transform","translate("+ (-distance)+",0)").ease(d3.easeSinOut);
									
			//setTimeout(function(){
				newElem.remove().exit();
				that.drawQueue();
			//},300);			
		}
		
  };

  Queue.prototype.drawQueue = function () {
		var that = this;
		
    if(this.queue !== undefined){
			this.queue.remove().exit();
		}

		if(this.queueData.length === 0)
			return ;

		this.queue = this.container.append("g");
		this.queue.selectAll("g.rect")
			.data(this.queueData)
			.enter()
			.append("rect")
			.attr("x",function(d,i){return 100+(that.rectWidth+that.padding)*(that.front+i);})
			.attr("y",300)
			.attr("width", this.rectWidth)
			.attr("height", this.rectHeight)
			.attr("rx",10)
			.attr("ry",10)
			.attr("fill","#FAAF08")
			.attr("id",function(d,i){return "rectIdx"+i;})
			.attr("opacity",1.0)
			.on("mouseover", this.mouseOver)
			.on("mouseout", this.mouseOut);

		this.queue.selectAll("g.text")
			.data(this.queueData)
			.enter()
			.append("text")
			.text(function(d,i){return d;})
			.attr("x",function(d,i){return 100+(that.rectWidth+that.padding)*(that.front+i) +that.rectWidth/2;})
		 	.attr("y",function(){return 300+that.rectHeight/5*3;})
			.attr("fill","black")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("text-anchor","middle")
			.attr("id",function(d,i){return "textIdx"+i;});

		this.queue.append("text")
			.text("▼")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("fill","black")
			.attr("text-anchor","middle")
			.attr("x",function(){return 100+(that.rectWidth+that.padding)*that.front +that.rectWidth/2;})
			.attr("y",function(){return 300-that.rectHeight*0.2;})
		
		this.queue.append("text")
			.text("front")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("fill","black")
			.attr("text-anchor","middle")
			.attr("x",function(){return 100+(that.rectWidth+that.padding)*that.front +that.rectWidth/2;})
			.attr("y",function(){return 300-that.rectHeight*0.5;})
	

		this.queue.append("text")
			.text("▼")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("fill","black")
			.attr("text-anchor","middle")
			.attr("x",function(){return 100+(that.rectWidth+that.padding)*that.rear +that.rectWidth/2;})
			.attr("y",function(){return 300-that.rectHeight*0.2;})
		
		this.queue.append("text")
			.text("rear")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("fill","black")
			.attr("text-anchor","middle")
			.attr("x",function(){return 100+(that.rectWidth+that.padding)*that.rear +that.rectWidth/2;})
			.attr("y",function(){return 300-that.rectHeight*0.5;})
  };

  window.thisplay.Queue = Queue;

})(window, window.d3);
