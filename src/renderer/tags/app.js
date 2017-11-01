'use strict';
import * as riot from 'riot';
import {APP,STORY} from "common/events";

riot.tag('app',
`<appbar
    ref="appbar"
    title="{opts.text}"
    links="{applinks}">
</appbar>
<div class="o-grid o-panel o-panel--nav-top">
    <sidebar ref="sidebar" class="o-grid__cell--width-15 o-grid__cell--hidden o-grid__cell--visible@large o-panel-container"
        knots={knots}>
    </sidebar>
    <main class="o-grid__cell o-grid__cell--width-85@large o-panel-container">
        <div class="o-grid o-grid--wrap o-panel">
            <div class="o-grid__cell o-grid__cell--width-100">
                <h1 class="c-heading u-super">
                    {opts.subtext}
                </h1>
            </div>
			<div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-60@large">
                <rg-unsplash></rg-unsplash>
            </div>
            <div class="o-grid__cell o-grid__cell--width-100 t-secondary">
                <div class="o-grid o-grid--wrap">
                    <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-33@large">
                        <h3 class="c-heading u-large">Next Goals</h3>
                        <div class="c-card t-demo">
                            <div class="c-card__item">
                                <p class="c-paragraph c-text--loud">Gain more items and add them to the total</p>
                                <p class="c-paragraph">Lorem ipsum dolor sit amet, feugiat corpora ex eam. Inciderint eloquentiam sea
                                    et.</p>
                            </div>
                        </div>
                        <div class="c-card t-demo">
                            <div class="c-card__item">
                                <p class="c-paragraph c-text--loud">Max out the number of items</p>
                                <p class="c-paragraph">Lorem ipsum dolor sit amet, feugiat corpora ex eam. Inciderint eloquentiam sea
                                    et.</p>
                            </div>
                        </div>
                    </div>
                    <div class="o-grid__cell o-grid__cell--width-100 o-grid__cell--width-66@large">
                        <h3 class="c-heading u-large">Notifications</h3>
                            <div class="c-alert c-alert--warning">
                                <button class="c-button c-button--close">×</button>
                                Not all data available for <strong class="u-text--loud">4th June 2016</strong>
                            </div>
                            <div class="c-alert c-alert--success">
                                <button class="c-button c-button--close">×</button>
                                New user added - (dexter@another.com)
                            </div>
                            <div class="c-alert c-alert--info">
                                <button class="c-button c-button--close">×</button>
                                Goal reached on 28th May 2016!
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>`,
function (opts) {
    const self = this;
    this.knot;
    this.stitch;
    this.alert = {isVisible:false}
    this.text = opts.text;
    this.subtext = opts.subtext;
    function click (e) {console.log(e)}
    this.applinks = [
        {label:"Help/Support",icon:"life-ring",secondary:true,event:APP.NAV.HELP.OPEN},
        {label:"Settings",icon:"sliders",secondary:true,event:APP.NAV.SETTINGS.OPEN},
        {label:"About",icon:"question",secondary:true,event:APP.NAV.ABOUT.OPEN}
    ]
    this.knots = [
        {label:"1", stitches: [{path:"1.1",label:"1"},{path:"1.2",label:"2"},{path:"1.3",label:"3"}]},
        {label:"2", stitches: []},
        {label:"3", stitches: [{path:"3.1",label:"1"},{path:"3.2",label:"2"}]}
    ]
    this.on('mount',() => {
        this.refs.appbar.on(APP.NAV.ABOUT.OPEN, (e) => {console.log("about")})
        this.refs.appbar.on(APP.NAV.SETTINGS.OPEN, (e) => {console.log("SETTINGS")})
        this.refs.appbar.on(APP.NAV.HELP.OPEN, (e) => {console.log("HALPS")})
        this.refs.sidebar.on(STORY.NAV.KNOT.GOTO, (knot) => {this.knot = knot})
        this.refs.sidebar.on(STORY.NAV.STITCH.GOTO, (stitch) => {this.stitch = stitch})
        this.refs.sidebar.on(STORY.EDIT.KNOT.UPDATE, (knot) => {
            this.knots.push({label:knot,stitches:[]});
            this.knot = knot;
        })
        this.refs.sidebar.on(STORY.EDIT.STITCH.UPDATE, (stitch) => {
            let k = this.knots.filter(k => k.label == this.knot)[0];
            k.stitches.push({label:stitch,path:[k.label,stitch].join('.')})
        })
    })
    this.on(STORY.EDIT.KNOT.CREATE,() => {
        this.refs.sidebar.trigger(STORY.EDIT.KNOT.CREATE);
    })
    this.on(STORY.EDIT.STITCH.CREATE,() => {
        this.refs.sidebar.trigger(STORY.EDIT.STITCH.CREATE);
    })
});