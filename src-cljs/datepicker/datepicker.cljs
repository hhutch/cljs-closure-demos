(ns datepicker
  (:require
    [goog.dom :as dom]
    [goog.date :as goog-date]
    [goog.i18n.DateTimeSymbols :as goog-dt]
    [goog.i18n.DateTimeSymbols_en_ISO :as goog-dt-iso]
    [goog.i18n.DateTimeSymbols_en_US :as goog-dt-us]
    [goog.i18n.DateTimeSymbols_de :as goog-dt-de]
    [goog.i18n.DateTimeSymbols_ml :as goog-dt-ml]
    [goog.i18n.DateTimeSymbols_ar_YE :as goog-dt-ye]
    [goog.ui.DatePicker :as goog-picker])
  (:use-macros [event-macros :only [listen-for-checkbox-click
                                    listen-for-calendar-change
                                    render-calendar]]))


(defn ^:export setup []
  (let [dp-iso-8601 (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_en_ISO)
        dp-custom (goog.ui.DatePicker. (goog.date.Date. 2006 0 1))
        dp-en-US (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_en_US)
        dp-de (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_de)
        dp-ml (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_ml)
        dp-ar-YE (goog.ui.DatePicker. nil goog.i18n.DateTimeSymbols_ar_YE)]

    ;; ## Standard: ISO 8601
    (render-calendar "widget_iso_8601" "label_iso_8601" dp-iso-8601)

    ;; ## Custom
    (render-calendar "widget_custom" "label_custom" dp-custom)

    (listen-for-checkbox-click "ck-0" setShowFixedNumWeeks dp-custom)
    (listen-for-checkbox-click "ck-1" setShowOtherMonths dp-custom)
    (listen-for-checkbox-click "ck-2" setExtraWeekAtEnd dp-custom)
    (listen-for-checkbox-click "ck-3" setShowWeekNum dp-custom)
    (listen-for-checkbox-click "ck-4" setShowWeekdayNames dp-custom)
    (listen-for-checkbox-click "ck-5" setAllowNone dp-custom)
    (listen-for-checkbox-click "ck-6" setShowToday dp-custom)
    (listen-for-checkbox-click "ck-7" setUserNarowWeekdayNames dp-custom)
    (listen-for-checkbox-click "ck-8" setUseSimpleNavigationMenu dp-custom)

    ;; ## English (US)
    (render-calendar "widget_en_US" "label_en_US" dp-en-US)

    ;; ## German 
    (render-calendar "widget_de" "label_de" dp-de)

    ;; ## Malayalam
    (render-calendar "widget_ml" "label_ml" dp-ml)

    ;; ## Arabic (Yemen)
    (render-calendar "widget_ar_YE" "label_ar_YE" dp-ar-YE)
    ))
