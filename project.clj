(defproject cljs-closure-demos "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.2.9"]]
  :cljsbuild {
              :builds {:advancedtooltip
                       {:source-path "src-cljs/advancedtooltip"
                        :compiler {:output-to "resources/public/cljs/advancedtooltip.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :autocompletebasic
                       {:source-path "src-cljs/autocomplete_basic"
                        :compiler {:output-to "resources/public/cljs/autocompletebasic.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :animationqueue
                       {:source-path "src-cljs/animationqueue"
                        :compiler {:output-to "resources/public/cljs/animationqueue.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :gauge
                       {:source-path "src-cljs/gauge"
                        :compiler {:output-to "resources/public/cljs/gauge.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :bubble
                       {:source-path "src-cljs/bubble"
                        :compiler {:output-to "resources/public/cljs/bubble.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :charcounter
                       {:source-path "src-cljs/charcounter"
                        :compiler {:output-to "resources/public/cljs/charcounter.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :charpicker
                       {:source-path "src-cljs/charpicker"
                        :compiler {:output-to "resources/public/cljs/charpicker.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :progressbar
                       {:source-path "src-cljs/progressbar"
                        :compiler {:output-to "resources/public/cljs/progressbar.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :colorcontrast
                       {:source-path "src-cljs/colorcontrast"
                        :compiler {:output-to "resources/public/cljs/colorcontrast.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :colorpicker
                       {:source-path "src-cljs/colorpicker"
                        :compiler {:output-to "resources/public/cljs/colorpicker.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :datepicker
                       {:source-path "src-cljs/datepicker"
                        :compiler {:output-to "resources/public/cljs/datepicker.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :combobox
                       {:source-path "src-cljs/combobox"
                        :compiler {:output-to "resources/public/cljs/combobox.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :domselection
                       {:source-path "src-cljs/domselection"
                        :compiler {:output-to "resources/public/cljs/domselection.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :drilldownrow
                       {:source-path "src-cljs/drilldownrow"
                        :compiler {:output-to "resources/public/cljs/drilldownrow.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :scrollfloater
                       {:source-path "src-cljs/scrollfloater"
                        :compiler {:output-to "resources/public/cljs/scrollfloater.js"}
                        :optimizations :whitespace
                        :pretty-print true}

}})