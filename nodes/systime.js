/**
 * Copyright 2021 Ocean (iot.redplc@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
	"use strict";

	const syslib = require('./lib/syslib.js');

	RED.nodes.registerType("systime", function(n) {
		var node = this;
		RED.nodes.createNode(node, n);

		node.tagnameai = "IA" + n.addressai;
		node.tupdate = n.tupdate;
  		node.iserror = false;
		node.setai = false;
		node.ampm = n.ampm;
		node.store = node.context().global;

		function getDateTime() {
			if (node.iserror)
				return;

			var dt = new Date();
			var hr = dt.getHours();
			var ap = (hr >= 12) ? 1 : 0;
			var hr = (node.ampm) ? hr % 12 : hr;
			node.store.set(node.tagnameai, [dt.getSeconds(), dt.getMinutes(), hr, ap, dt.getDay(), dt.getDate(), dt.getMonth() + 1, dt.getFullYear()]);
		}

		if (node.store.keys().find(key => key === node.tagnameai) !== undefined)
			node.iserror = syslib.outError(node, "duplicate " + node.tagnameai, "duplicate address " + node.tagnameai);
		else {
			getDateTime();
			syslib.setStatus(node, node.tagnameai);
			node.setai = true;
		}

		node.id_loop = setInterval(getDateTime, node.tupdate);

		node.on('close', function () {
			clearInterval(node.id_loop);
			if (node.setai)
				node.store.set(node.tagnameai, undefined);
		});
	});
}
