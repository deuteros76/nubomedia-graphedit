// Mutable section for dealing with non-reactive, external pieces
// Having this breaks the purity of React/Redux but we may need it
// until we figure out a better solution for having jsPlumb in the mix
// They should mutate the state in-place and return the passed in state.

import GraphEditor from '../GraphEditor'

var editor = null;
var editorContainer   = null;
var editorProjectcb   = null;
var editorNodecb      = null;
var editorValidatecb  = null;
var editorGeneratecodecb  = null;

export function getEditor() {
  return editor;
}

export function setContainer(el, projectcb, nodecb, validatecb, generatecodecb) {
  editorContainer   = el;
  editorProjectcb   = projectcb;
  editorNodecb      = nodecb;
  editorValidatecb  = validatecb;
  editorGeneratecodecb = generatecodecb;
}

export function getEditedGraph() {
  if (editor) {
    return {
      nodes: editor.getNodes().map((node) =>
        ({type: node.type, id: node.id, name: node.name, x: node.x, y: node.y, properties: node.properties})
      ),
      connections: editor.getConnections()
    };
  }
  return {nodes:[], connections: []};
}

function setEditor(e) {
  if (editor && editor != e) {
    editor.destroy();
  }
  editor = e;
}

export function setupNewEditor(graph, nodedefs) {
  setEditor(null);
  if (graph) {
    setEditor(new GraphEditor(editorContainer, editorProjectcb, editorNodecb, editorValidatecb, editorGeneratecodecb));
    editor.batch( function(editor) {
      graph.nodes.forEach((node) => editor.createNode(node.type, nodedefs.defs[node.type], node.id, node.name, node.x, node.y, node.properties));
      graph.connections.forEach((c) => editor.createConnection(c.source, c.sourceEP, c.target, c.targetEP));
    });
  }
}
