import React, { useEffect, useRef } from 'react';

const TableauEmbed = () => {
  const tableauRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    script.onload = () => {
      const divElement = tableauRef.current;
      const vizElement = divElement.getElementsByTagName('object')[0];
      
      if (vizElement) {
        const updateVizSize = () => {
          const width = divElement.offsetWidth;
          const height = width * 1.6; // Adjust the aspect ratio as needed
          vizElement.style.width = `${width}px`;
          vizElement.style.height = `${height}px`;
        };
        updateVizSize();
        window.addEventListener('resize', updateVizSize);
        return () => window.removeEventListener('resize', updateVizSize);
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={tableauRef} className='tableauPlaceholder' id='viz1715920772252' style={{ position: 'relative', width: '100%', height: '100%' }}>
      <noscript>
        <a href='#'>
          <img alt='Dashboard 1' src='https://public.tableau.com/static/images/PJ/PJ_54/Dashboard1/1_rss.png' style={{ border: 'none' }} />
        </a>
      </noscript>
      <object className='tableauViz' style={{ display: 'none', width: '100%', height: '735px' }}>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='path' value='views/PJ_54/Dashboard1?:language=en-US&:embed=true&:sid=' />
        {/* <param name='toolbar' value='yes' />
        <param name='static_image' value='https://public.tableau.com/static/images/PJ/PJ_54/Dashboard1/1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='en-US' /> */}
      </object>
    </div>
  );
};

export default TableauEmbed;
