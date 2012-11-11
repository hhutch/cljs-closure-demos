(ns event-macros)

(defmacro listen-for-checkbox-click
  [elem meth date-profile]
  `(.listen goog.events 
            (dom/getElement ~elem)
            (.. goog.events -EventType -CLICK)
            #(cljs.core/this-as check-clicked#
                     (. ~date-profile (~(symbol meth) (= true (.-checked check-clicked#)))))))

(defmacro listen-for-calendar-change
  [elem date-profile]
  `(.listen goog.events ~date-profile
              (.. goog.ui.DatePicker -Events -CHANGE)
              (fn [event#]
                (dom/setTextContent 
                 (dom/getElement ~elem)
                 (if (.-date event#)
                   (.. event# -date (~'toIsoString true)) 
                   "none")))))
