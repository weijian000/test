'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Ruler, Info, Search } from 'lucide-react';
import { Input } from './ui/input';

interface SizeGuideProps {
  onBack: () => void;
}

export function SizeGuide({ onBack }: SizeGuideProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const engineParts = [
    { part: 'Piston Rings', diameter: '95.25mm', tolerance: '±0.02mm', notes: 'Standard bore' },
    { part: 'Cylinder Bore', diameter: '95.25mm', tolerance: '±0.01mm', notes: 'Original specification' },
    { part: 'Valve Seats', innerDiam: '28.5mm', outerDiam: '35mm', notes: 'Inlet valve' },
    { part: 'Oil Filter', length: '85mm', diameter: '76mm', thread: '3/4" UNF', notes: 'Spin-on type' }
  ];

  const brakeParts = [
    { part: 'Brake Disc', diameter: '254mm', thickness: '10mm', pcd: '4x114.3mm', notes: 'Front disc' },
    { part: 'Brake Pads', length: '115mm', width: '45mm', thickness: '12mm', notes: 'Front pads' },
    { part: 'Brake Drum', diameter: '228mm', width: '38mm', notes: 'Rear drum' },
    { part: 'Brake Shoes', length: '200mm', width: '32mm', thickness: '4.5mm', notes: 'Rear shoes' }
  ];

  const electricalParts = [
    { part: 'Spark Plugs', thread: '14mm x 1.25', reach: '19mm', gap: '0.6-0.7mm', notes: 'NGK BP6ES or equivalent' },
    { part: 'Headlight Bulb', type: 'H4', voltage: '12V', wattage: '60/55W', notes: 'European specification' },
    { part: 'Fuses', type: 'Glass tube', diameter: '6mm', length: '32mm', notes: 'Various amperages' }
  ];

  const bodyParts = [
    { part: 'Door Handle', length: '120mm', width: '25mm', mounting: '85mm centers', notes: 'Chrome finish' },
    { part: 'Wing Mirror', diameter: '105mm', mounting: '10mm stud', notes: 'Round convex' },
    { part: 'Bumper Height', ground: '380mm', centerline: '420mm', notes: 'Front and rear' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Size Guide & Specifications</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive dimensional data for Rover P6 parts and components
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for a specific part..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="engine" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="engine">Engine</TabsTrigger>
              <TabsTrigger value="brakes">Brakes</TabsTrigger>
              <TabsTrigger value="electrical">Electrical</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>

            <TabsContent value="engine" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ruler className="h-5 w-5 mr-2" />
                    Engine Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Part Name</th>
                          <th className="text-left py-2">Diameter/Length</th>
                          <th className="text-left py-2">Tolerance</th>
                          <th className="text-left py-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {engineParts
                          .filter(part => 
                            searchTerm === '' || 
                            part.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            part.notes.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((part, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 font-medium">{part.part}</td>
                            <td className="py-3">{part.diameter}</td>
                            <td className="py-3">{part.tolerance}</td>
                            <td className="py-3 text-gray-600">{part.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="brakes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ruler className="h-5 w-5 mr-2" />
                    Brake Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Part Name</th>
                          <th className="text-left py-2">Dimensions</th>
                          <th className="text-left py-2">Additional Info</th>
                          <th className="text-left py-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {brakeParts
                          .filter(part => 
                            searchTerm === '' || 
                            part.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            part.notes.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((part, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 font-medium">{part.part}</td>
                            <td className="py-3">
                              Ø{part.diameter}
                              {'thickness' in part && ` × ${part.thickness}`}
                              {'width' in part && ` × ${part.width}`}
                            </td>
                            <td className="py-3">
                              {'pcd' in part && `PCD: ${part.pcd}`}
                            </td>
                            <td className="py-3 text-gray-600">{part.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="electrical" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ruler className="h-5 w-5 mr-2" />
                    Electrical Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Part Name</th>
                          <th className="text-left py-2">Specifications</th>
                          <th className="text-left py-2">Technical Details</th>
                          <th className="text-left py-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricalParts
                          .filter(part => 
                            searchTerm === '' || 
                            part.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            part.notes.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((part, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 font-medium">{part.part}</td>
                            <td className="py-3">
                              {'thread' in part && `Thread: ${part.thread}`}
                              {'type' in part && `Type: ${part.type}`}
                              {'voltage' in part && `${part.voltage}`}
                            </td>
                            <td className="py-3">
                              {'reach' in part && `Reach: ${part.reach}`}
                              {'gap' in part && `, Gap: ${part.gap}`}
                              {'wattage' in part && `${part.wattage}`}
                              {'diameter' in part && `Ø${part.diameter}`}
                              {'length' in part && ` × ${part.length}`}
                            </td>
                            <td className="py-3 text-gray-600">{part.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="body" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ruler className="h-5 w-5 mr-2" />
                    Body & Exterior
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Part Name</th>
                          <th className="text-left py-2">Dimensions</th>
                          <th className="text-left py-2">Mounting</th>
                          <th className="text-left py-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bodyParts
                          .filter(part => 
                            searchTerm === '' || 
                            part.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            part.notes.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((part, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 font-medium">{part.part}</td>
                            <td className="py-3">
                              {'length' in part && `L: ${part.length}`}
                              {'width' in part && ` × W: ${part.width}`}
                              {'diameter' in part && `Ø${part.diameter}`}
                              {'ground' in part && `Ground: ${part.ground}`}
                              {'centerline' in part && `, Center: ${part.centerline}`}
                            </td>
                            <td className="py-3">
                              {'mounting' in part && part.mounting}
                            </td>
                            <td className="py-3 text-gray-600">{part.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="font-semibold text-blue-800 mb-2">Measurement Standards</h4>
                  <p className="text-sm text-blue-700">
                    All measurements are provided in metric units unless otherwise specified. 
                    Imperial equivalents are available upon request.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h4 className="font-semibold text-yellow-800 mb-2">Tolerances</h4>
                  <p className="text-sm text-yellow-700">
                    Manufacturing tolerances are critical for proper fit and function. 
                    Always verify dimensions before installation.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <h4 className="font-semibold text-green-800 mb-2">Part Compatibility</h4>
                  <p className="text-sm text-green-700">
                    These specifications apply to standard Rover P6 models (1963-1977). 
                    Contact us for modified or special variant requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}