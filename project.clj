(def cljs-build-params
  "List of the UI demos to build and output as individual JS libraries"
  (apply merge
         (map #(hash-map
                % {:source-path (str "src-cljs/" (name %))
                   :compiler {:output-to (str  "resources/public/cljs/" (name %) ".js")
                              ;; :source-map (str "resources/public/cljs/" (name %) ".js.map")
                              ;; :source-map-path "/cljs/"
                              }
                   :optimizations :whitespace
                   :pretty-print true})
              [:advancedtooltip :animationqueue :autocompletebasic
               :autocompleteremote :autocompleterichremote
               :bubble :charcounter :charpicker
               :colorcontrast :colorpicker :combobox
               :datepicker :domselection :drilldownrow :editor
               :gauge :hsvapalette :keyboardshortcuts
               :labelinput :progressbar :scrollfloater
               :serverchart :slider :submenus2
               :tablesorter :useragent :viewportsizemonitor
               :zippy])))

(defproject cljs-closure-demos "0.1.0-SNAPSHOT"
  :description "Idiomatic implementations of Google Closure UI demos in Clojurescript"
  :url "http://hhutch.github.io/cljs-closure-demos/"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2127"]]
  :plugins [[lein-cljsbuild "1.0.1"]]
  :cljsbuild {:builds ~cljs-build-params})
