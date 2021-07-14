<script>
	import { onMount } from 'svelte'
	import Loader from './components/ui/Loader.svelte'
	import Header from './components/ui/Header.svelte'
	import Footer from './components/ui/Footer.svelte'
	import Icons from './components/ui/Icons.svelte'
	import DataTable from './components/composites/DataTable.svelte'
	import Switch from './components/composites/Switch.svelte'
	import Toast from './components/ui/Toast.svelte'
	import Modal from './components/ui/Modal.svelte'
	import ViewSelect from './components/composites/ViewSelect.svelte'
	import Search from './components/composites/Search.svelte'
	import HelpButton from './components/composites/HelpButton.svelte'
	import ReportButton from './components/composites/ReportButton.svelte'
	import CopyButton from './components/composites/CopyButton.svelte'
	import SubmitButton from './components/composites/SubmitButton.svelte'
	import { post, get } from './utils/http'

	import apData from './components/store/data'
	import { showHelp } from './components/store/help'
	import modal from './components/store/modal'
	import loading from './components/store/loading'
	import user from './components/store/user'
	import toast from './components/store/toast'

	import Fuse from 'fuse.js'

	let displayName = undefined
	let userName = undefined
	let selectedOption = 0
	let searchText = ''
	const version = '1.0.0'

	$: rows = searchFilterAPData($apData, searchText, selectedOption)

	onMount(async () => {
		loading.show()

		// const res = await get('/action/connect-with-sso')

		const userInfo = {
			name: 'Brian Casey',
			displayName: 'brian.casey'
		}
		
		user.set(userInfo)
		userName = $user.name
		displayName = $user.displayName

		// const request = await post('/action/get-data', {userName})
		const request = {
			ok: true,
			recordset: [{
				active: 0,
				item: 123456,
				project: 'XXX001-001',
				doc_type: 'VO',
				reference_number: 456789,
				invoice_number: 456321123,
				vendor_id: 'VEND1',
				vendor_name: 'Vendor1',
				status: 'A',
				keep_on_hold: 'Y',
				due_date: '2020-05-06',
				doc_date: '2020-04-21',
				current_amt: 100.52,
				amt1_30: 0,
				amt31_60: 0,
				amt61_90: 0,
				amt_over_90: 0,
				balance: 100.52,
				renention_amt: 0,
				total: 100.52,
				PrevAppr: false,
				ParentID: 552222,
				HasDoc: 22
				}, {
				active: 1,
				item: 789654,
				project: 'XXX001-001',
				doc_type: 'VO',
				reference_number: 456789,
				invoice_number: 456321123,
				vendor_id: 'VEND1',
				vendor_name: 'Vendor1',
				status: 'A',
				keep_on_hold: 'Y',
				due_date: '2020-05-06',
				doc_date: '2020-04-21',
				current_amt: 100.52,
				amt1_30: 0,
				amt31_60: 0,
				amt61_90: 0,
				amt_over_90: 0,
				balance: 100.52,
				renention_amt: 0,
				total: 100.52,
				PrevAppr: false,
				ParentID: 552222,
				HasDoc: 22
			}]
		}

		if(request.ok) {
			apData.setApData(request.recordset)
		} else {
			toast.pushToast({msg: 'Could not retrieve data. Please make sure you are connected to the network. If you are connected and are still receiving this error, please contact support at support@company.com.',
				perpetual: true,
				closable: true})
		}

		setTimeout(() => {
			loading.hide()
		}, 200)
	})

	const searchData = (data, searchText) => {
		if (searchText === '') {
			return data
		} else {
			const options = {
				keys: ['project', 'reference_number', 'invoice_number', 'vendor_name'],
				shouldSort: false,
				distance: 0
			}
			const fuse = new Fuse(data, options)
			let result = fuse.search(searchText)
			let searchedData = []
			result.forEach((i) => {
				searchedData.push(i.item)
			})
	
			return searchedData

		}
	}

	const filterData = (data, selectedOption) => {
		let filteredData
		if (selectedOption === 0) {
			// PrevAppr = 'False'
			filteredData = data.filter(d => d.PrevAppr === false)
		} else {
			//PrevAppr = 'True' and apdocstat = 'A'
			filteredData = data.filter(d => d.PrevAppr === true)
		}
		return filteredData
	}

	const searchFilterAPData = (data, searchText, selectedOption) => {
		console.log(data);
		let filteredData = filterData(data, selectedOption)

		let searchedRows = searchData(filteredData, searchText)

		return searchedRows

	}

	const head = {
        active: {
            render: true,
			type: 'component',
            title: 'Status',
			component: Switch,
            width: 50,
			propModel: {
				// propName: info from row data (sql query) to send through as the prop value
				key: 'item',
				active: 'active'
			}
		},
		project: {
			render: true,
			type: 'value',
			title: 'Project',
			sort: true,
		},
		reference_number: {
			render: true,
			type: 'link',
			title: 'Ref Nbr',
			sort: true,
			linkVar: 'ParentID',
			link: "http://company.link.com/?refnbr="
		},
		invoice_number: {
			render: true,
			type: 'value',
			title: 'Inv Nbr',
			sort: true,
		},
		vendor_id: {
			render: true,
			type: 'value',
			title: 'Vendor ID',
			sort: true,
		},
		vendor_name: {
			render: true,
			type: 'value',
			title: 'Vendor Name',
			sort: true,
		},
		keep_on_hold: {
			render: true,
			type: 'value',
			title: 'Keep on Hold',
			sort: true,
		},
		due_date: {
			render: true,
			type: 'value',
			title: 'Due Date',
			sort: true,
		},
		doc_date: {
			render: true,
			type: 'value',
			title: 'Doc Date',
			sort: true,
		},
		current_amt: {
			render: true,
			type: 'value',
			title: 'Current Amt',
			format: 'currency',
		},
		amt1_30: {
			render: true,
			type: 'value',
			title: 'Amt 1-30',
			format: 'currency'
		},
		amt31_60: {
			render: true,
			type: 'value',
			title: 'Amt 31-60',
			format: 'currency'
		},
		amt61_90: {
			render: true,
			type: 'value',
			title: 'Amt 61-90',
			format: 'currency'
		},
		amt_over_90: {
			render: true,
			type: 'value',
			title: 'Amt Over 90',
			format: 'currency'
		},
		balance: {
			render: true,
			type: 'value',
			title: 'Balance',
			format: 'currency'
		},
		rentention_amt: {
			render: true,
			type: 'value',
			title: 'Retention',
			format: 'currency'
		},
		total: {
			render: true,
			type: 'value',
			title: 'Total',
			format: 'currency'
		},
		PrevAppr: {
			title: 'PrevAppr',
			render: false
		},
		ParentID: {
			title: 'Parent ID',
			render: false
		},
		WindowsCredentials: {
			title: 'Windows Credentials',
			render: false
		},
		HasDoc: {
			title: 'HasDoc',
			render: false
		},
		item: {
			render: false,
			title: 'Item',
		},
		status: {
			render: false,
			type: 'value',
			title: 'Status',
			sort: true,
		},
		doc_type: {
			render: false,
			type: 'value',
			title: 'Doc Type',
		},
	}

</script>

<div class="app-wrapper">
	<div class="header">
		<Header name={displayName} />
	</div>

	<section class="controls" class:help-active={$showHelp}>
		<div class="select-search">
			<ViewSelect on:changeSelection={(e) => selectedOption = e.detail.value} />
			<Search on:searchText={(e) => searchText = e.detail} />
		</div>
		<div class="buttons">
			<HelpButton />
			<ReportButton />
			<CopyButton selector='table' />
			<SubmitButton />
		</div>
	</section>

	<section class="data-table">
		<DataTable striped={true} {head} {rows} />
	</section>

	<div class="footer">
		<Footer {version} />
	</div>

	<Modal {...$modal.options} />
	<Loader />
	<Icons />
	<Toast />

</div>

<style>

	.app-wrapper {
		display: grid;
		grid-template: 
			"head   head   head"   6rem
			"ctrls ctrls ctrls" 5rem
			".     dt    ."     1fr
			"foot  foot  foot"  40px /
			1fr    98%   1fr;
		min-height: 100%;
	}

	.header {
		grid-area: head;
	}

	.controls {
		grid-area: ctrls;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--sidebar-text);
		position: -webkit-sticky; /* Safari */
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 1;
	}

	.data-table {
		grid-area: dt;
	}

	.help-active {
		position: unset;
		z-index: 6;
	}

	.select-search {
		display: flex;
		margin-left: 1rem;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.footer {
		grid-area: foot;
	}
</style>