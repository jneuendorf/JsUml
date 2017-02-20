// Generated by CoffeeScript 1.10.0
(function() {
  var _global, clean, exports, getNamespaceName, getNamespaceOfClass, heterarchy, inheritsSelf, isClass, isJavaScriptClass, javaScriptClassNames, javaScriptClasses, namespaceId, unique,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  if (typeof window !== "undefined") {
    exports = (window.JsUml = {});
    heterarchy = window.heterarchy;
    _global = window;
  } else if (typeof global !== "undefined") {
    exports = module.exports;
    _global = global;
  }

  javaScriptClassNames = ["Array", "Boolean", "Date", "Error", "Function", "Number", "RegExp", "String", "Object", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "Symbol", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "DataView", "Promise", "Generator", "GeneratorFunction", "Reflect", "Proxy"];

  javaScriptClasses = javaScriptClassNames.reduce(function(classes, name) {
    classes[_global[name]] = _global[name];
    return classes;
  }, {});

  isJavaScriptClass = function(cls) {
    return javaScriptClasses[cls] === cls;
  };

  isClass = function(obj) {
    return typeof obj === "function" && (obj.prototype != null) && !isJavaScriptClass(obj);
  };

  namespaceId = 1;

  getNamespaceName = function(namespace) {
    return "namespace#" + (namespaceId++);
  };

  getNamespaceOfClass = function(cls, tuples) {
    var i, len, tuple;
    for (i = 0, len = tuples.length; i < len; i++) {
      tuple = tuples[i];
      if (tuple[0] === cls) {
        return tuple[1];
      }
    }
    return null;
  };

  unique = function(arr) {
    var e, i, len, res;
    res = [];
    for (i = 0, len = arr.length; i < len; i++) {
      e = arr[i];
      if (indexOf.call(res, e) < 0) {
        res.push(e);
      }
    }
    return res;
  };

  inheritsSelf = function(line) {
    var parts;
    parts = line.split(/\s*\<\|\-\-\s*/);
    return parts[0] === parts[1];
  };

  clean = function(lines) {
    var line;
    return (function() {
      var i, len, ref, results;
      ref = unique(lines);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        if (!inheritsSelf(line)) {
          results.push(line);
        }
      }
      return results;
    })();
  };

  exports.setNamespaceGetter = function(getter) {
    return getNamespaceName = getter;
  };

  exports.generateUml = function() {
    var base, bases, classList, classNames, classNamespaceTuples, classes, cls, duplicateClassNames, i, j, k, len, len1, len2, name, namespace, namespaceName, namespaces, plantUml, plantUmlLine, plantUmlLines, ref;
    namespaces = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    classes = {};
    classNamespaceTuples = [];
    classNames = [];
    duplicateClassNames = [];
    for (i = 0, len = namespaces.length; i < len; i++) {
      namespace = namespaces[i];
      namespaceName = getNamespaceName(namespace);
      classes[namespaceName] = [];
      for (name in namespace) {
        cls = namespace[name];
        if (!(isClass(cls) && indexOf.call(classes, cls) < 0)) {
          continue;
        }
        classes[namespaceName].push(cls);
        classNamespaceTuples.push([cls, namespaceName]);
        if (indexOf.call(classNames, name) >= 0) {
          duplicateClassNames.push(name);
        }
        classNames.push(name);
      }
    }
    plantUmlLines = ["@startuml"];
    for (namespaceName in classes) {
      classList = classes[namespaceName];
      for (j = 0, len1 = classList.length; j < len1; j++) {
        cls = classList[j];
        if (cls.__bases__ != null) {
          bases = cls.__bases__;
        } else if (cls.__super__) {
          bases = [cls.__super__.constructor];
        } else {
          bases = [];
        }
        for (k = 0, len2 = bases.length; k < len2; k++) {
          base = bases[k];
          plantUmlLine = "";
          if (ref = base.name, indexOf.call(duplicateClassNames, ref) >= 0) {
            namespaceName = getNamespaceOfClass(base, classNamespaceTuples);
            if ((namespaceName != null ? namespaceName.length : void 0) > 0) {
              plantUmlLine += namespaceName + ".";
            }
          }
          plantUmlLine += base.name + " <|-- " + cls.name;
          plantUmlLines.push(plantUmlLine);
        }
      }
    }
    plantUmlLines.push("@enduml");
    plantUml = clean(plantUmlLines).join("\n");
    return console.log(plantUml);
  };

}).call(this);
