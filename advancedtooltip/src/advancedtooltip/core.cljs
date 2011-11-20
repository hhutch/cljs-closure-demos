(ns advancedtooltip
  (:require
    [goog.dom :as dom]
    [goog.events.EventType :as event-type]
    [goog.ui.AdvancedTooltip :as advanced-tooltip]))

(defn add-link 
  [parent file]
  (let [ss (dom/createDom "link")]
    (dom/setProperties ss (.strobj {"type" "text/css"
                                    "rel" "stylesheet"
                                    "href" file}))
    (dom/appendChild parent ss)))

(defn ^:export prepenvironment []
  (let [head-list (dom/getElementsByTagNameAndClass "head")
        prep-css (fn [dir file] (str dir (name file) ".css"))
        head (. head-list (item 0)) ]
       (doseq [css-file-path 
                (list (prep-css "../css/" :demo)
                (prep-css "css" :tooltip)) ]
         (add-link head css-file-path)) ))

(defn ^:export buildtooltip [button-id tooltip-classname]
  (let [tooltip (goog.ui.AdvancedTooltip. button-id)]
    ;(!set (.className tooltip) "tooltip") 
    (. tooltip (setHtml (str "<h2>AdvancedTooltip</h2>"
                             "<ul><li>Move cursor towards the tooltip (<em>that's me!</em>) " 
                             "and see that it remains open.</li>" 
                             "<li>Before reaching it start moving the cursor in another " 
                             "direction...</li>" 
                             "<li>Once the cursor reaches the tooltip the cursor tracking is turned " 
                             "off and  a 10px 'padding' around it gets added. As long as the cursor " 
                             "stays inside the box formed by the tooltip and the padding it remains " 
                             "open.</li></ul><hr/><div style=\"text-align: center;\">" 
                             "<button id=\"btn-nest\">Hover me</button>&nbsp;" 
                             "<button id=\"btn-close\">Close</button></div>") true))
    (. tooltip (setHotSpotPadding (goog.math.Box. 5 5 5 5)))
    (. tooltip (setCursorTracking true))
    (. tooltip (setMargin (goog.math.Box. 100 0 0 100)))
    (. tooltip (setHideDelayMs 250))
    (. (goog.ui.AdvancedTooltip. "btn-nest") (setHtml "Clicking<br> this<br> button<br> has no effect."))
    (goog.ui.Tooltip. "btn-close" "Closes tooltip")
    (.listen goog.events (goog.dom.getElement. "btn-close")
                           goog.events.EventType.CLICK
                           (fn [e] (. tooltip (setVisible false)))) ))
