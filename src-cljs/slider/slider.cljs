(ns slider
  (:require 
    [goog.dom :as dom]
    [goog.ui.Component :as goog-component]
    [goog.ui.Slider :as goog-slider]))

(defn add-link
  [parent file]
  (let [ss (dom/createDom "link")]
    (dom/setProperties ss (.-strobj {"type" "text/css"
                                    "rel" "stylesheet"
                                    "href" file}))
    (dom/appendChild parent ss)))

(defn ^:export prepenvironment []
  (let [head-list (dom/getElementsByTagNameAndClass "head")
        prep-css (fn [dir file] (str dir (name file) ".css"))
        head (. head-list (item 0)) ]
       (doseq [css-file-path
                (list (prep-css "css/" :demo)
                (prep-css "css/" :slider)) ]
         (add-link head css-file-path)) ))

(defn ^:export buildslider []
  (let [slider-one (goog.ui.Slider.)
        el (dom/getElement "s1")
        label-s2 (dom/getElement "s2-label")
        moveto-s1 (dom/getElement "moveto-s1")
        moveto-s2 (dom/getElement "moveto-s2")
        body (. (dom/getElementsByTagNameAndClass "body") (item 0))
        slider-two (goog.ui.Slider.)]
    ;; ## Horizontal Slider
    (. slider-one (decorate el))
    ;; Listen for change event on goog.ui.slider
    (.listen goog.events 
       slider-one
       "change"
       #(set! (.-innerHTML (dom/getElement "out1")) (. slider-one getValue)))
    ;; Listen for click event on checkbox to change slider mode
    (.listen goog.events
       moveto-s1
       "click"
       #(. slider-one (setMoveToPointEnabled (.-checked moveto-s1))))

    ;; ;; ## Vertical Slider
    (. slider-two (setOrientation "vertical"))
    (. slider-two (createDom))
    (let [el2 (. slider-two (getElement))] 
      (set! (.-width (.-style el2)) "20px") 
      (set! (.-height (.-style el2)) "200px"))
    (.render slider-two document.body)
    (.setStep slider-two nil)
    (.listen goog.events
       slider-two
       "change"
       #(set! (.-innerHTML (dom/getElement "out2")) (. slider-two getValue)))
    (.listen goog.events
       moveto-s2
       "click"
       #(. slider-two (setMoveToPointEnabled (.-checked moveto-s2))))))

