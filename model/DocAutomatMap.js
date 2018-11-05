const db= require(__APPROOT + '/ext/db.js');
const nconf= require(__APPROOT + '/config');

class DocAutomatMap{
	constructor(){
		this.db= db;
		this.msg= nconf.get('msg');
	}
	
	/* DOC AUTOMAT MAP */

	addAutomatMap(req){
		const { id_rout_map_item, id_equipment, firmness, ev, md, profile, mz, koi, program, t_o, t_v, t_pz, t_st, emulsion, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8 }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`INSERT
							INTO ff_doc_automat_map
								(id_visitor_create, 
								id_rout_map_item, 
								id_equipment, 
								firmness, 
								ev, 
								md, 
								profile, 
								mz, 
								koi, 
								program, 
								t_o, 
								t_v, 
								t_pz, 
								t_st, 
								emulsion, 
								approve_1, 
								approve_2, 
								approve_3, 
								approve_4, 
								approve_5, 
								approve_6, 
								approve_7, 
								approve_8)
							VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[id_visitor, id_rout_map_item, id_equipment, firmness, ev, md, profile, mz, koi, program, t_o, t_v, t_pz, t_st, emulsion, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8],
							(err, data= false)=>{
								const { insertId }= data;
								insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			})
	}

	editAutomatMap(req){
		const { id, id_rout_map_item, id_equipment, firmness, ev, md, profile, mz, koi, program, t_o, t_v, t_pz, t_st, emulsion, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8 }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_doc_automat_map
						SET
							id_visitor_update= ?, 
							id_rout_map_item= ?, 
							id_equipment= ?, 
							firmness= ?, 
							ev= ?, 
							md= ?, 
							profile= ?, 
							mz= ?, 
							koi= ?, 
							program= ?, 
							t_o= ?, 
							t_v= ?, 
							t_pz= ?, 
							t_st= ?, 
							emulsion= ?, 
							approve_1= ?, 
							approve_2= ?, 
							approve_3= ?, 
							approve_4= ?, 
							approve_5= ?, 
							approve_6= ?, 
							approve_7= ?, 
							approve_8= ?,
							date_update= ?
						WHERE id= ?`,
						[id_visitor, id_rout_map_item, id_equipment, firmness, ev, md, profile, mz, koi, program, t_o, t_v, t_pz, t_st, emulsion, approve_1, approve_2, approve_3, approve_4, approve_5, approve_6, approve_7, approve_8, 'CURRENT_TIMESTAMP', id],
						(err, data= false)=>{
							const { affectedRows }= data;
							affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	getAutomatMapById(req){
		const { id }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							am.*,
							e.name as equipment_name,
							e.model as equipment_model,
							e.num as equipment_num,
							rm.name,
							rm.num_detail,
							m.mark as material_mark,
							m.standart as material_standart,
							mt.name as material_name
						FROM ff_doc_automat_map am
						INNER JOIN ff_equipment e ON am.id_equipment = e.id
						INNER JOIN ff_doc_rout_map rm ON am.id_rout_map_item = rm.id
						INNER JOIN ff_material m ON rm.id_material = m.id
						INNER JOIN ff_material_type mt ON m.id_type = mt.id
						WHERE am.id= ?`,
						[id],
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	/* DOC AUTOMAT MAP ITEM */

	addAutomatMapItem(req){
		const { id_automat_map, name, pi, d_v, l, t, i, s, n, v, t_o, t_v }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
				this.db.getConnection((err, connection)=>{
					if(!err){
						connection.query(`INSERT
							INTO ff_doc_automat_map_item
								(id_visitor_create, 
								id_automat_map, 
								name, 
								pi, 
								d_v, 
								l, 
								t, 
								i, 
								s, 
								n, 
								v, 
								t_o, 
								t_v)
							VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[id_visitor, id_automat_map, name, pi, d_v, l, t, i, s, n, v, t_o, t_v],
							(err, data= false)=>{
								const { insertId }= data;
								insertId ? resolve(Object.assign( {}, this.msg.add, { id : data.insertId } )) : reject( { data: this.msg.err, err : err } );
								connection.release();
							});
					} else {
						reject( { data: this.msg.err, err : err } );
					}
				});
			})
	}
	
	editAutomatMapItem(req){
		const { id, id_automat_map, name, pi, d_v, l, t, i, s, n, v, t_o, t_v }= req.body;
		const { id_visitor }= req.session.user;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`UPDATE ff_doc_automat_map_item
						SET
							id_visitor_update= ?, 
							id_automat_map= ?, 
							name= ?, 
							pi= ?, 
							d_v= ?, 
							l= ?, 
							t= ?, 
							i= ?, 
							s= ?, 
							n= ?, 
							v= ?, 
							t_o= ?, 
							t_v= ?, 
							date_update= ?
						WHERE id= ?`,
						[id_visitor, id_automat_map, name, pi, d_v, l, t, i, s, n, v, t_o, t_v, 'CURRENT_TIMESTAMP', id],
						(err, data= false)=>{
							const { affectedRows }= data;
							affectedRows ? resolve( this.msg.edit ) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

	getAutomatMapItemAll(req){
		const { id_automat_map }= req.params;

		return new Promise((resolve, reject)=>{
			this.db.getConnection((err, connection)=>{
				if(!err){
					connection.query(`SELECT
							*
						FROM ff_doc_automat_map_item
						WHERE id_automat_map= ?`,
						[id_automat_map],
						(err, data)=>{
							data ? resolve(data) : reject( { data: this.msg.err, err : err } );
							connection.release();
						});
				} else {
					reject( { data: this.msg.err, err : err } );
				}
			});
		});
	}

}

module.exports= DocAutomatMap;