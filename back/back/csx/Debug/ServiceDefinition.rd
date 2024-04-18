<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="back" generation="1" functional="0" release="0" Id="54e5f649-5978-4388-8888-1df150d7096c" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="backGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="ReditService:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/back/backGroup/LB:ReditService:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="ReditService:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="">
          <maps>
            <mapMoniker name="/back/backGroup/MapReditService:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </maps>
        </aCS>
        <aCS name="ReditServiceInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/back/backGroup/MapReditServiceInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:ReditService:Endpoint1">
          <toPorts>
            <inPortMoniker name="/back/backGroup/ReditService/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapReditService:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" kind="Identity">
          <setting>
            <aCSMoniker name="/back/backGroup/ReditService/Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </setting>
        </map>
        <map name="MapReditServiceInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/back/backGroup/ReditServiceInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="ReditService" generation="1" functional="0" release="0" software="E:\DOCUMENTS\FAKULTET\PSI8\CLOUD\CLOUD-Reddit\back\back\csx\Debug\roles\ReditService" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaIISHost.exe " memIndex="-1" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="" />
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;ReditService&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;ReditService&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/back/backGroup/ReditServiceInstances" />
            <sCSPolicyUpdateDomainMoniker name="/back/backGroup/ReditServiceUpgradeDomains" />
            <sCSPolicyFaultDomainMoniker name="/back/backGroup/ReditServiceFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyUpdateDomain name="ReditServiceUpgradeDomains" defaultPolicy="[5,5,5]" />
        <sCSPolicyFaultDomain name="ReditServiceFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="ReditServiceInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="ab865a0e-0047-4cb4-bfc7-f2e520f74acb" ref="Microsoft.RedDog.Contract\ServiceContract\backContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="0099a03b-7dd5-467b-bbed-f02748464d35" ref="Microsoft.RedDog.Contract\Interface\ReditService:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/back/backGroup/ReditService:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>