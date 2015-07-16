var exampleArray = [5,10,1,9,6,7,15,20,30,4];
var totalNodes = 20,
    treeData   = new Array(totalNodes),
    treeHeight = Math.ceil(Math.log2(totalNodes));

AVLTree.unitTest .randFill(treeData,0,100);
var root = AVLTree.unitTest.testAVLInsert(treeData);

var containerName = "#tree-container";

 // build the options object
var  maxLabelLength = 0,
     customOptions = {},
     options = $.extend({
        nodeRadius: 20, 
        fontSize: 12
     }, customOptions);

// size of the diagram
var size = {
    width:Math.pow(2,treeHeight)*options.nodeRadius,
    height:treeHeight*options.nodeRadius*10
};
var tree = d3.layout.tree()
    .sort(null)
    .size([800,600])
    .children(function(node){
        var a = [];
        if( node.left ) a.push(node.left);
        if( node.right ) a.push(node.right);
        return a;
    });

var nodes = tree.nodes(root);
var links = tree.links(nodes);

var layoutRoot = d3.select(containerName)
     .append("svg:svg")
     .attr("width", 900)
     .attr("height", 700)
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
         var gap = options.nodeRadius - ((options.fontSize * (d.value+'').length)/2);
         return gap;
     })
     */
     .attr("dy", 3)
     .text(function(node){
         return node.value;
     });
