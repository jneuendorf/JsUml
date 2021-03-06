if typeof window isnt "undefined"
    root = window
    heterarchy = window.heterarchy
    JsUml = window.JsUml
    isNode = false
else if typeof global isnt "undefined"
    root = global
    heterarchy = require("heterarchy")
    JsUml = require("./js_uml.js")
    isNode = true


root.namespace1 = {}
root.namespace2 = {}
root.namespace3 = {}
root.namespace4 = {}

class root.namespace1.A
class root.namespace1.B extends root.namespace1.A
class root.namespace1.C extends root.namespace1.A
class root.namespace1.D extends heterarchy.multi(root.namespace1.B, root.namespace1.C)
class root.namespace1.E extends root.namespace1.A
class root.namespace1.F extends heterarchy.multi(root.namespace1.C, root.namespace1.E)
class root.namespace1.G extends heterarchy.multi(root.namespace1.D, root.namespace1.F)

class root.namespace2.A

class root.namespace3.A
class root.namespace4.A
class root.namespace1.X extends root.namespace3.A
class root.namespace1.X extends heterarchy.multi(root.namespace3.A, root.namespace4.A, root.namespace1.A)

JsUml.setNamespaceGetter (namespace) ->
    dict = [
        [root.namespace1, "namespace1"]
        [root.namespace2, "namespace2"]
        [root.namespace3, "namespace3"]
        [root.namespace4, "namespace4"]
    ]
    for tuple in dict when tuple[0] is namespace
        return tuple[1]
    return ""

plantUml = JsUml.generateUml(root.namespace1, root.namespace2, root.namespace3, root.namespace4)
console.log(plantUml)

base64 = compress(plantUml)
url = "http://www.plantuml.com/plantuml/img/#{base64}"
if not isNode
    document.querySelector("iframe").src = url
else
    console.log(url)
