(def cljs-build-params
  (apply merge
         (map #(hash-map
                % {:source-path (str "src-cljs/" (name %))
                   :compiler {:output-to (str "resources/public/cljs/" (name %) ".js")}
                   :optimizations :whitespace
                   :pretty-print true})
              [:advancedtooltip :animationqueue :autocompletebasic
               :bubble :charcounter :charpicker
               :colorcontrast :colorpicker :combobox
               :datepicker :domselection :drilldownrow
               :gauge :hsvapalette :keyboardshortcuts
               :labelinput :progressbar :scrollfloater
               :serverchart :slider :submenus2
               :tablesorter :useragent :viewportsizemonitor
               :zippy])))

(defproject cljs-closure-demos "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.2.9"]]

  :cljsbuild {:builds ~cljs-build-params})

