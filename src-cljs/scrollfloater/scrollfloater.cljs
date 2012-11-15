(ns scrollfloater
  (:require
    [goog.dom :as dom]
    [goog.events :as goog-events]
    [goog.ui.ScrollFloater :as scroll-floater]
    [goog.ui.ToggleButton :as toggle-button]))

(defn ^:export setup []
  (let [parent-form (. (dom/getElementsByTagNameAndClass "form") (item 0))
        scroll-floater1 (goog.ui.ScrollFloater.)
        button1 (goog.ui.ToggleButton. "Enable Floater 1")
        scroll-floater2 (goog.ui.ScrollFloater.)
        button2 (goog.ui.ToggleButton. "Enable Floater 2") 
        setup-click-handler (fn [ctrl floater]
                              (. ctrl (setState "checked"))
                              (.listen goog.events
                                       ctrl
                                       "action"
                                       (fn [] (. floater (setScrollingEnabled (. ctrl (isChecked))))))) ]
    (. button1 (render (dom/getElement "floater1")))
    (. scroll-floater1 (decorate (dom/getElement "floater1")))
    (. scroll-floater2 (addChild button2 true))
    (. scroll-floater2 (render (dom/getElement "floater2container")))

    (setup-click-handler button1 scroll-floater1)
    (setup-click-handler button2 scroll-floater2)
  )
)
