var totalNodes = 10,
    treeData   = new Array(totalNodes),
    treeHeight = Math.ceil(Math.log2(totalNodes));

MaxHeap.test.randFill(treeData);
MaxHeap.buildMaxHeap(treeData);

var containerName = "#tree-container";

 // build the options object
var  maxLabelLength = 0,
     customOptions = {},
     options = $.extend({
        nodeRadius: 20, fontSize: 12
     }, customOptions);

// size of the diagram
var size = { width:Math.pow(2,treeHeight)*options.nodeRadius, height:treeHeight*options.nodeRadius*15 };
var tree = d3.layout.tree()
    .sort(null)
    .size([size.width,size.height])
    .children(function(node){
        var array = node.array,
            i     = node.index,
            left  = MaxHeap.left(i),
            right = MaxHeap.right(i);

        if( left < 0 || left >= array.length || isNaN(left) ) return null;
        if( right < 0 || right >= array.length || isNaN(right) ) return null;
        return [{array:array,index:left},{array:array,index:right}];
    });

var nodes = tree.nodes({array:treeData, index:0});
var links = tree.links(nodes);

var layoutRoot = d3.select(containerName)
     .append("svg:svg")
     .attr("width", size.width*options.fontSize)
     .attr("height", size.height*10)
     .append("svg:g")
     .attr("class", "container")
     .attr("transform", "translate(" + maxLabelLength + ",0)");
 
 
 // Edges between nodes as a <path class="link" />
 var link = d3.svg.diagonal()
     .projection(function(d){
         return [d.x, d.y];
     });
 
 layoutRoot.selectAll("path.link")
     .data(links)
     .enter()
     .append("svg:path")
     .attr("class", "link")
     .attr("d", link);
 
 
 /*
     Nodes as
     <g class="node">
         <circle class="node-dot" />
         <text />
     </g>
  */
 var nodeGroup = layoutRoot.selectAll("g.node")
     .data(nodes)
     .enter()
     .append("svg:g")
     .attr("class", "node")
     .attr("transform", function(d){
         return "translate(" + d.x + "," + (d.y+options.nodeRadius) + ")";
     });
 nodeGroup.append("svg:circle")
     .attr("class", "node-dot")
     .attr("r", options.nodeRadius);
 
 nodeGroup.append("svg:text")
     .attr("text-anchor", function(d){
         return d.children ? "end" : "start";
     })
     /*
     .attr("dx", function(d){
         var gap = 2 * options.nodeRadius;
         return d.children ? -gap : gap;
     })
     .attr("dy", 3)
     */
     .text(function(node){
         return node.array[node.index];
     });
