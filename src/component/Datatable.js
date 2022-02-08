import React from "react";
import * as grpcWeb from 'grpc-web'
import {ListSchemasRequest, SchemasServicePromiseClient, FilterPublicPrivate} from '@strmprivacy-internal/api-definitions'


const client = new SchemasServicePromiseClient("https://api.dev.strmprivacy.io")

// const res = client.listSchemas(req)

class Datatable extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            schemas: [],
            industry: ''
        };
      }

    componentDidMount() {
        const req = new ListSchemasRequest();
        req.setPublicPrivate(FilterPublicPrivate.ONLY_PUBLIC);

        client.listSchemas(req).then(res => this.setState({
            schemas: formatData(res.toObject().schemasList)
        }));

    }


    render() {
        return (
            <div className="container">
                <div className="grid grid-cols-3 justify-items-start my-12">
                <div className="flex-1">
                    <input type="text" className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="search" placeholder='search' />
                {/* hier moet een search bar */}
                </div>
                <div className="flex-1">
                    <select className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-state">
                    {this.state.schemas.flatMap((item) => item.usage).filter(onlyUnique).sort().map((item) => 
                        <option>{item}</option>

                    )}
                    </select>
                {/* hier moet een dropdown */}
                </div>
                <div className="flex-1">
                    <select className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-state">
                    {this.state.schemas.flatMap((item) => item.industry).filter(onlyUnique).sort().map((item) => 
                        <option>{item}</option>

                    )}
                        
                    </select>
                {/* hier moet een dropdown */}
                </div>
            </div>


            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ref</th>
                        <th className="px-4 py-2">private</th>
                        <th className="px-4 py-2">type</th>
                        <th className="px-4 py-2">usage</th>
                        <th className="px-4 py-2">industry</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.schemas.map((item) =>
                    <tr>
                        <td className="border px-4 py-2">{item.ref}</td>
                        <td className="border px-4 py-2">{item.isPublic}</td>
                        <td className="border px-4 py-2">{item.type}</td>
                        <td className="border px-4 py-2">{item.usage.map(usageItem => <span className="mx-2">{usageItem}</span>)}</td>
                        <td className="border px-4 py-2">{item.industry.map(industryItem => <span className="mx-2">{industryItem}</span>)}</td>
                    </tr>
                    )}
                </tbody>
            </table>

        </div>


        )
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
                          
                    

function formatData(schemasList) {

    console.log(schemasList);

    let formatted = schemasList.map(item => {
        return {
            ref: item.ref.handle + '/' + item.ref.name + '/' + item.ref.version,
            isPublic: ((item.isPublic) ? 'public' : 'private'),
            type: ((item.ref.schemaType == 1) ? 'Avro' : 'JSON'),
            usage: item.metadata.domainsList,
            industry: item.metadata.industriesList
        };
    })

    return formatted;
    
}

export default Datatable;

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f3a4827f9beae74a6d9cb9048287591b