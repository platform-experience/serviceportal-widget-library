function GanttChartController() {
  var c = this;
  var demo = {
    "data": c.data.series
  }

  gantt.config.readonly = true;
  gantt.templates.task_text = function (start, end, task) {
    return '';
  };

  gantt.config.columns = [
    { name: "text", label: "Task name", tree: true, width: "*", resize: true },
    {
      name: "state", label: "State", align: "center", template: function (obj) {
        //Closed Complete
        if (obj.state == "3") {
          return "<span class='fa fa-check-circle'></span>"
        }
        //Work in Progress
        else if (obj.state == "2") {
          return "<span class='fa fa-minus-circle'></span>"
        }
        //Close Incomplete
        else {
          return "<span class='fa fa-exclamation-circle'></span>"
        }
      }
    }
  ];
  gantt.config.min_column = 50;
  gantt.templates.task_class = function (start, end, task) {
    if (task.parent != 0) {
      task.color = "#b0e1ce";
    }
  };
  gantt.config.smart_scales = false;
  gantt.config.min_column_width = 30;



  gantt.config.layout = {
    css: "gantt_container",
    cols: [
      {
        width: 250,
        min_width: 300,
        rows: [
          { view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer" },

          // horizontal scrollbar for the grid
          { view: "scrollbar", id: "gridScroll", group: "horizontal" }
        ]
      },
      { resizer: true, width: 1 },
      {
        rows: [
          { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },

          // horizontal scrollbar for the timeline
          { view: "scrollbar", id: "scrollHor", group: "horizontal" }
        ]
      },
      { view: "scrollbar", id: "scrollVer" }
    ]
  };


  gantt.config.subscales = [
    { unit: "year", step: 1, date: "%Y" }
  ];
  gantt.config.date_scale = "%M";
  gantt.config.xml_date = "%Y-%m-%d";
  gantt.config.autosize = "xy";
  gantt.config.scale_unit = "month";
  gantt.init("gantt_here");
  gantt.parse(demo);
}
