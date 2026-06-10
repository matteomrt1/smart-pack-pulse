import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

const COMPANY = {
  name: 'Imballaggi Bustesi sas',
  address: 'Via Guglielmo Pepe 5, 21052 Busto Arsizio (VA)',
  vat: 'P.IVA / C.F. 00656270121',
  email: 'info@imballaggibustesi.it',
  privacyEmail: 'privacy@imballaggibustesi.it',
  phone: '0331 628019',
};

const SECTIONS = [
  { id: 'titolare', label: 'Titolare del Trattamento' },
  { id: 'dati', label: 'Tipologie di Dati raccolti' },
  { id: 'modalita', label: 'Modalità e luogo del trattamento' },
  { id: 'conservazione', label: 'Periodo di conservazione' },
  { id: 'finalita', label: 'Finalità del Trattamento' },
  { id: 'dettagli', label: 'Dettagli sul trattamento' },
  { id: 'cookie', label: 'Cookie Policy' },
  { id: 'base-giuridica', label: 'Base giuridica' },
  { id: 'diritti', label: 'Diritti dell\'Utente (GDPR)' },
  { id: 'esercizio', label: 'Come esercitare i diritti' },
  { id: 'ulteriori', label: 'Ulteriori informazioni' },
  { id: 'definizioni', label: 'Definizioni e riferimenti legali' },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-32 text-[22px] md:text-[26px] font-normal tracking-tight text-foreground mt-16 mb-5">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[16px] font-medium text-foreground mt-8 mb-3">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] leading-[1.75] text-muted-foreground font-light mb-4">{children}</p>;
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary mb-4 font-normal">Legale</p>
          <h1 className="text-[36px] md:text-[44px] font-light tracking-tight text-foreground leading-[1.1] mb-6">
            Privacy Policy
          </h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground font-light mb-3">
            Privacy Policy di <strong className="font-medium text-foreground">www.imballaggibustesi.it</strong>.
            Questa Applicazione raccoglie alcuni Dati Personali dei propri Utenti.
          </p>
          <p className="text-[12px] text-muted-foreground/70 font-light">
            Ultima modifica: 10 giugno 2026 · Questo documento può essere stampato utilizzando il comando di stampa del browser.
          </p>

          {/* Indice */}
          <nav className="mt-12 p-6 rounded-3xl border border-border/60 bg-muted/30">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-normal">Indice</p>
            <ol className="space-y-2 text-[13.5px] font-light">
              {SECTIONS.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="text-muted-foreground/60 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <a href={`#${s.id}`} className="text-foreground hover:text-primary transition-colors">{s.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Riassunto */}
          <H2 id="riassunto">Riassunto della policy</H2>
          <P>
            Dati Personali trattati per le seguenti finalità e utilizzando i seguenti servizi:
          </P>
          <ul className="text-[14.5px] leading-[1.8] text-muted-foreground font-light list-disc pl-5 mb-4 space-y-1">
            <li><strong className="font-medium text-foreground">Contattare l'Utente</strong> — Modulo di contatto e comunicazioni email (nome, cognome, ragione sociale, email, telefono, messaggio).</li>
            <li><strong className="font-medium text-foreground">Hosting e infrastruttura</strong> — Fornitore di hosting cloud (UE).</li>
            <li><strong className="font-medium text-foreground">Log di sistema e manutenzione</strong> — Indirizzo IP, user-agent, dati di navigazione tecnici.</li>
          </ul>

          {/* Titolare */}
          <H2 id="titolare">Titolare del Trattamento dei Dati</H2>
          <P>
            <strong className="font-medium text-foreground">{COMPANY.name}</strong><br />
            {COMPANY.address}<br />
            {COMPANY.vat}<br />
            Indirizzo email del Titolare: <a href={`mailto:${COMPANY.privacyEmail}`} className="text-primary hover:underline">{COMPANY.privacyEmail}</a><br />
            Telefono: <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{COMPANY.phone}</a>
          </P>

          {/* Tipologie di Dati */}
          <H2 id="dati">Tipologie di Dati raccolti</H2>
          <P>
            Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono: nome;
            cognome; ragione sociale; numero di telefono; email; contenuto del messaggio; Dati di utilizzo (indirizzo IP,
            user-agent, data e ora di accesso, pagine visitate).
          </P>
          <P>
            Dettagli completi su ciascuna tipologia di Dati Personali raccolti sono forniti nelle sezioni dedicate di
            questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta dei Dati stessi.
          </P>
          <P>
            I Dati Personali possono essere liberamente forniti dall'Utente o, nel caso di Dati di Utilizzo, raccolti
            automaticamente durante l'uso di questa Applicazione. Se non diversamente specificato, tutti i Dati richiesti
            da questa Applicazione sono obbligatori. Se l'Utente rifiuta di comunicarli, potrebbe essere impossibile per
            questa Applicazione fornire il Servizio.
          </P>
          <P>
            L'Utente si assume la responsabilità dei Dati Personali di terzi ottenuti, pubblicati o condivisi mediante
            questa Applicazione e garantisce di avere il diritto di comunicarli o diffonderli, liberando il Titolare da
            qualsiasi responsabilità verso terzi.
          </P>

          {/* Modalità */}
          <H2 id="modalita">Modalità e luogo del trattamento dei Dati raccolti</H2>
          <H3>Modalità di trattamento</H3>
          <P>
            Il Titolare adotta le opportune misure di sicurezza volte ad impedire l'accesso, la divulgazione, la modifica
            o la distruzione non autorizzate dei Dati Personali. Il trattamento viene effettuato mediante strumenti
            informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità
            indicate.
          </P>
          <P>
            Oltre al Titolare, in alcuni casi, potrebbero avere accesso ai Dati altri soggetti coinvolti
            nell'organizzazione di questa Applicazione (personale amministrativo, commerciale, marketing, legali,
            amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri
            postali, hosting provider, società informatiche) nominati anche, se necessario, Responsabili del Trattamento
            da parte del Titolare. L'elenco aggiornato dei Responsabili potrà sempre essere richiesto al Titolare.
          </P>
          <H3>Luogo</H3>
          <P>
            I Dati sono trattati presso le sedi operative del Titolare a Busto Arsizio (VA) e presso i data center del
            fornitore di hosting, situati nell'Unione Europea. Per ulteriori informazioni, contatta il Titolare.
          </P>

          {/* Conservazione */}
          <H2 id="conservazione">Periodo di conservazione</H2>
          <P>
            Se non diversamente indicato in questo documento, i Dati Personali sono trattati e conservati per il tempo
            richiesto dalla finalità per la quale sono stati raccolti e potrebbero essere conservati per un periodo più
            lungo a causa di eventuali obbligazioni legali o sulla base del consenso degli Utenti.
          </P>
          <P>
            In particolare: i Dati raccolti tramite il modulo di contatto sono conservati per il tempo necessario a
            evadere la richiesta e successivamente per un massimo di 24 mesi dall'ultimo contatto utile, salvo
            obbligazioni legali o contrattuali che ne impongano una conservazione più lunga.
          </P>

          {/* Finalità */}
          <H2 id="finalita">Finalità del Trattamento dei Dati raccolti</H2>
          <P>
            I Dati dell'Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi
            di legge, rispondere a richieste o azioni esecutive, tutelare i propri diritti ed interessi, nonché per le
            seguenti finalità: gestione delle richieste di contatto e di preventivo, comunicazioni commerciali
            direttamente connesse alla richiesta, hosting ed infrastruttura, monitoraggio tecnico e sicurezza.
          </P>

          {/* Dettagli */}
          <H2 id="dettagli">Dettagli sul trattamento dei Dati Personali</H2>

          <H3>Modulo di contatto (questa Applicazione)</H3>
          <P>
            L'Utente, compilando con i propri Dati il modulo di contatto, acconsente al loro utilizzo per rispondere alle
            richieste di informazioni, di preventivo o di qualunque altra natura indicata dall'intestazione del modulo.
            <br /><br />
            <strong className="font-medium text-foreground">Dati Personali trattati:</strong> nome; cognome; ragione
            sociale; email; numero di telefono; contenuto del messaggio.
          </P>

          <H3>Comunicazioni email dirette</H3>
          <P>
            L'Utente che contatta volontariamente il Titolare all'indirizzo <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a> acconsente
            al trattamento dei Dati contenuti nella comunicazione al fine di evadere la richiesta.
            <br /><br />
            <strong className="font-medium text-foreground">Dati Personali trattati:</strong> email; eventuali Dati
            inseriti dall'Utente nel messaggio.
          </P>

          <H3>Hosting ed infrastruttura backend</H3>
          <P>
            Questa Applicazione è ospitata presso un fornitore di hosting cloud con data center situati nell'Unione
            Europea. Il fornitore tratta i Dati esclusivamente per garantire il funzionamento del Servizio.
            <br /><br />
            <strong className="font-medium text-foreground">Dati Personali trattati:</strong> Dati di utilizzo; varie
            tipologie di Dati secondo quanto specificato dalla privacy policy del servizio.
          </P>

          <H3>Log di sistema e manutenzione</H3>
          <P>
            Per necessità legate al funzionamento ed alla manutenzione, questa Applicazione e gli eventuali servizi terzi
            da essa utilizzati potrebbero raccogliere log di sistema, ossia file che registrano le interazioni e che
            possono contenere anche Dati Personali, quali l'indirizzo IP Utente.
          </P>

          {/* Cookie */}
          <H2 id="cookie">Cookie Policy</H2>
          <P>
            Questa Applicazione utilizza esclusivamente cookie tecnici essenziali al funzionamento del sito e al
            mantenimento della sessione dell'Utente. Non vengono utilizzati cookie di profilazione, di analisi di terze
            parti o di marketing senza il preventivo consenso dell'Utente.
          </P>

          {/* Base giuridica */}
          <H2 id="base-giuridica">Base giuridica del trattamento</H2>
          <P>
            Il Titolare tratta Dati Personali relativi all'Utente in caso sussista una delle seguenti condizioni:
          </P>
          <ul className="text-[14.5px] leading-[1.8] text-muted-foreground font-light list-disc pl-5 mb-4 space-y-1">
            <li>l'Utente ha prestato il consenso per una o più finalità specifiche;</li>
            <li>il trattamento è necessario all'esecuzione di un contratto con l'Utente e/o all'esecuzione di misure precontrattuali;</li>
            <li>il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il Titolare;</li>
            <li>il trattamento è necessario per il perseguimento del legittimo interesse del Titolare o di terzi.</li>
          </ul>
          <P>
            È comunque sempre possibile richiedere al Titolare di chiarire la concreta base giuridica di ciascun
            trattamento.
          </P>

          {/* Diritti */}
          <H2 id="diritti">Diritti dell'Utente sulla base del GDPR</H2>
          <P>
            Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare. In
            particolare, nei limiti previsti dalla legge, l'Utente ha il diritto di:
          </P>
          <ul className="text-[14.5px] leading-[1.8] text-muted-foreground font-light list-disc pl-5 mb-4 space-y-1">
            <li><strong className="font-medium text-foreground">revocare il consenso</strong> in ogni momento;</li>
            <li><strong className="font-medium text-foreground">opporsi al trattamento</strong> dei propri Dati quando esso avviene in virtù di una base giuridica diversa dal consenso;</li>
            <li><strong className="font-medium text-foreground">accedere ai propri Dati</strong> e ricevere una copia dei Dati trattati;</li>
            <li><strong className="font-medium text-foreground">verificare e chiedere la rettificazione</strong> dei propri Dati;</li>
            <li><strong className="font-medium text-foreground">ottenere la limitazione del trattamento</strong>;</li>
            <li><strong className="font-medium text-foreground">ottenere la cancellazione</strong> dei propri Dati Personali;</li>
            <li><strong className="font-medium text-foreground">ricevere i propri Dati o farli trasferire ad altro titolare</strong> (portabilità);</li>
            <li><strong className="font-medium text-foreground">proporre reclamo</strong> al Garante per la protezione dei dati personali o agire in sede giudiziale.</li>
          </ul>

          {/* Esercizio */}
          <H2 id="esercizio">Come esercitare i diritti</H2>
          <P>
            Eventuali richieste di esercizio dei diritti dell'Utente possono essere indirizzate al Titolare attraverso i
            recapiti forniti in questo documento (<a href={`mailto:${COMPANY.privacyEmail}`} className="text-primary hover:underline">{COMPANY.privacyEmail}</a>).
            La richiesta è gratuita e il Titolare risponderà nel più breve tempo possibile, in ogni caso entro un mese.
          </P>

          {/* Ulteriori */}
          <H2 id="ulteriori">Ulteriori informazioni sul trattamento</H2>
          <H3>Difesa in giudizio</H3>
          <P>
            I Dati Personali dell'Utente possono essere utilizzati da parte del Titolare in giudizio o nelle fasi
            preparatorie alla sua eventuale instaurazione per la difesa da abusi nell'utilizzo di questa Applicazione o
            dei Servizi connessi da parte dell'Utente.
          </P>
          <H3>Informative specifiche</H3>
          <P>
            Su richiesta dell'Utente, in aggiunta alle informazioni contenute in questa privacy policy, questa
            Applicazione potrebbe fornire all'Utente delle informative aggiuntive e contestuali riguardanti Servizi
            specifici, o la raccolta ed il trattamento di Dati Personali.
          </P>
          <H3>Modifiche a questa privacy policy</H3>
          <P>
            Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy in
            qualunque momento notificandolo agli Utenti su questa pagina e, se possibile, su questa Applicazione. Si
            prega dunque di consultare con frequenza questa pagina, facendo riferimento alla data di ultima modifica
            indicata in fondo.
          </P>

          {/* Definizioni */}
          <H2 id="definizioni">Definizioni e riferimenti legali</H2>
          <H3>Dati Personali (o Dati)</H3>
          <P>
            Costituisce dato personale qualunque informazione che, direttamente o indirettamente, anche in collegamento
            con qualsiasi altra informazione, ivi compreso un numero di identificazione personale, renda identificata o
            identificabile una persona fisica.
          </P>
          <H3>Dati di Utilizzo</H3>
          <P>
            Sono le informazioni raccolte automaticamente attraverso questa Applicazione, tra cui: gli indirizzi IP o i
            nomi a dominio dei computer utilizzati dall'Utente, gli indirizzi in notazione URI, l'orario della richiesta,
            il metodo utilizzato nell'inoltrare la richiesta al server, le caratteristiche del browser e del sistema
            operativo utilizzati dal visitatore.
          </P>
          <H3>Utente</H3>
          <P>L'individuo che utilizza questa Applicazione che, salvo ove diversamente specificato, coincide con l'Interessato.</P>
          <H3>Titolare del Trattamento</H3>
          <P>
            La persona fisica o giuridica che determina le finalità e i mezzi del trattamento di dati personali. Il
            Titolare del Trattamento di questa Applicazione è {COMPANY.name}.
          </P>
          <H3>Riferimenti legali</H3>
          <P>
            La presente informativa privacy è redatta sulla base di molteplici ordinamenti legislativi, inclusi gli
            artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR).
          </P>

          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-[12px] text-muted-foreground/70 font-light">
              Ultima modifica: 10 giugno 2026
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
